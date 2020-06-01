require('dotenv').config();
const fs = require('fs-extra');
const rp = require('request-promise');

const access_token = process.env.BOX_ACCESS_TOKEN;
const folder_id = process.env.BOX_MIGRATION_FOLDER_ID;
const folder = './data'

async function getItemsInFolder(folder_id) {
  const url = `https://api.box.com/2.0/folders/${folder_id}/items`;

  return rp.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      json: true
    }
  );
}

async function downloadFile(file_id, file_name) {
  const url = `https://api.box.com/2.0/files/${file_id}/content`;

  const content = await rp.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      json: true
    }
  );

  await fs.ensureDir(folder);

  const isFileExist = await fs.pathExists(`${folder}/${file_name}`);
  if (isFileExist) {
    return null;
  }

  await fs.writeJSON(`${folder}/${file_name}`, content);

  return `${folder}/${file_name}`;
}

getItemsInFolder(folder_id)
  .then(({ entries }) => {
    return Promise.all(entries.map(({ id, name }) => downloadFile(id, name)));
  })
  .then((files) => {
    return files.filter(f => Boolean(f));
  })
  .then(files => {
    if (!files.length) {
      console.warn('WARN: Nothing updated in Box migrations');
    } else {
      console.log('Sync updated from Box migrations successfully');
      console.log(files);
    }
  })
  .catch(err => {
    console.error(`Error: ${err}`);
  });