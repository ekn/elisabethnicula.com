#!/bin/bash

tmpdir=$(mktemp -d)
git clone -b master . $tmpdir
cd $tmpdir

echo "---"
echo "Building site..."
bundle exec jekyll build

echo "---"
echo "Copying site to origin..."
rsync -v --delete -r _site/ origins.f8ty.net:/var/www/elisabethnicula.com

$HOME/bin/purge-origins-f8ty-net
