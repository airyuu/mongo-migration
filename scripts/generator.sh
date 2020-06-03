#!/bin/bash

set -e

filename=$1
if [ -z "$filename" ]; then
    echo "Error: filefilename not provide" 1>&2
    exit 1
fi

now=$(date -u +"%Y%m%d%H%M%S")

MIGRATION_TEMPLATE="./template/migration.js"
MIGRATION_DIR="./migrations"
MIGRATION_FILE="${now}-${filename}.js"

# check if the migration directory exists
if [ ! -d "$MIGRATION_DIR" ]; then
    mkdir -p "${MIGRATION_DIR}"
fi

# generate migration file based on template
cp ${MIGRATION_TEMPLATE} "${MIGRATION_DIR}/${MIGRATION_FILE}"

TEST_TEMPLATE="./template/test.js"
TEST_DIR="./test"
TEST_FILE="${now}-${filename}.js"

# check if the test directory exists
if [ ! -d "$TEST_DIR" ]; then
    mkdir -p "${TEST_DIR}"
fi

# generate test file based on template
cp ${TEST_TEMPLATE} "${TEST_DIR}/${TEST_FILE}"