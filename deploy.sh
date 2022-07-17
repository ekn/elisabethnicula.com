#!/bin/bash

tmpdir=$(mktemp -d)
git clone -b master . $tmpdir
cd $tmpdir

echo "---"
echo "Building site..."
bundle exec jekyll build

echo "---"
echo "Copying site to origin..."
rsync -v --delete -r _site/ origin.elisabethnicula.com:/var/www/origin.elisabethnicula.com

echo "---"
echo "Purging Fastly..."
curl -XPOST -H 'Fastly-Key: AhsM-KNz-dp2ZoID-CHD0Eu03mciUX0h' -H 'Accept: application/json' https://api.fastly.com/service/6EdRv8JmOuz2Xbkf70W2QP/purge_all
echo
