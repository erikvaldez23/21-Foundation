#!/bin/bash

count=1

find . -type f ! -name "$(basename "$0")" | while IFS= read -r file; do
    dir=$(dirname "$file")
    filename=$(basename "$file")

    if [[ "$filename" == *.* ]]; then
        ext="${filename##*.}"
        newname="$dir/bbq($count).$ext"
    else
        newname="$dir/bbq($count)"
    fi

    mv "$file" "$newname"
    count=$((count + 1))
done
