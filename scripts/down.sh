#!/bin/bash

set -e

filename=$1
if [ -z "$filename" ]; then
  echo "Are you sure you want to migration down to the initial version?"
else
  file="./migrations/$filename"

  if [ -f "$file" ]; then
    echo "$file exist"
    echo "Are you sure you want to migration down to the version ${filename}?"
  else
    echo "Error: ${filename} does not exist in migrations"
    exit 1
  fi
fi

read -p "Press Y to contine, N to exit: " userInput

if [ $userInput != "Y" ]; then
  echo "exit"
  exit 1
fi

if [ -z "$filename" ]; then
  echo "migrate down to the initial version"
  migrate down --store="./lib/store.js"
else
  echo "migrate down to the version: ${filename}"
  migrate down --store="./lib/store.js" $filename
fi