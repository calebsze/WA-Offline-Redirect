#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
# Force puppeteer to install the working chrome binary in the cloud instance
npx puppeteer browsers install chrome
