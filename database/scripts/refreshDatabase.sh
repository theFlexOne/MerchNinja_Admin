#!/bin/bash

set -e

SCRIPT_DIR=$(dirname $0)

source $SCRIPT_DIR/createSeedFile.sh

supabase db reset --workdir database

supabase gen types typescript --local --workdir database > client/src/types/database.types.ts

echo "Do you want to delete the seed file? (yes/no)"
read answer

# Check the user's answer
if [ "$answer" = "yes" ]; then
    echo "Deleting the seed file..."
    rm -rf database/supabase/seed.sql
else
    echo "Not deleting the seed file."
fi

exit 0