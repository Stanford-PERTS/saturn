#!/bin/bash

# Commands to be run during a codeship build.
# In a codeship project, in the Setup Commands window, enter this:

# chmod +x codeship_setup.sh && ./codeship_setup.sh

# This ensures that lines which have an error cause this whole script to
# exit with an error.
# http://stackoverflow.com/questions/3474526/stop-on-first-error
set -e

# N.B. We _cannot_ use Codeship's caching of global dependencies because it
# causes `firebase: command not found` in the deploy step. This _might_ be b/c
# Codeship can't figure out our multiple npm prefixes.
# https://documentation.codeship.com/basic/languages-frameworks/nodejs/#dependency-cache

# Codeship [reads the NodeJS version in package.json][1] from the [engine
# setting][2] to set the version of local node. However, this _doesn't_ happen
# if you're debugging the build, in which case you should use nvm to install
# the right version, e.g. `nvm install [VERSION NUMBER]`
# [1]: https://documentation.codeship.com/classic/languages-frameworks/nodejs/
# [2]: https://docs.npmjs.com/files/package.json#engines

# [Codeship does not automatically keep npm up to date][3], but for Saturn
# forcing an update isn't necessary (although it may be in the future).
# [3]: https://documentation.codeship.com/basic/languages-frameworks/nodejs/#dependencies
# npm install -g npm@latest

# [Codeship recommends installing firebase globally][4]. DF also found that w/o
# this `firebase deploy` doesn't work in the deployment script.
# [4]: https://documentation.codeship.com/general/integrations/firebase/#codeship-basic
npm install -g firebase-tools

# Install dependencies for each of the multiple npm projects in this repo.
npm install

# We perform this before building because there's no point in building if we
# find a linting error.
npm run lint:all

# Build all apps
npm run build:all

# Setup Firebase tools and emulators
npm run setup:all

# Start up firebase emulators for testing
npm run start:firebase &
sleep 10
