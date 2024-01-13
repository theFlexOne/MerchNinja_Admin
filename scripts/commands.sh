#!/bin/bash

# Default path to the package.json file
PACKAGE_JSON_FILE_NAME="package.json"
DEFAULT_PATH="./"

# Check if the user has provided a path to the package.json file
if [ -z "$1" ]; then
    PACKAGE_JSON="$DEFAULT_PATH$PACKAGE_JSON_FILE_NAME"
else
    PACKAGE_JSON="$1/$PACKAGE_JSON_FILE_NAME"
fi

# Check if jq is installed
if ! command -v jq &> /dev/null
then
    echo "jq could not be found. Please install jq to run this script."
    exit 1
fi

# Check if package.json exists
if [ ! -f "$PACKAGE_JSON" ]; then
    echo "package.json not found at the specified path: $PACKAGE_JSON"
    exit 1
fi

# Print all available commands from package.json
echo "Available commands in package.json:"
jq -r '.scripts | to_entries[] | .key + ": " + .value' "$PACKAGE_JSON"