#!/bin/bash

folder_path="chats"

# Iterate over each JSON file in the folder
for file_path in "$folder_path"/*.json; do
    if [ -f "$file_path" ]; then
        # Format the JSON file using jq and save it back to the file
        jq '.' "$file_path" > "$file_path.tmp" && mv "$file_path.tmp" "$file_path"
        echo "Formatted file: $file_path"
    fi
done

