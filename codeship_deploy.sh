#!/bin/bash

# Commands for a custom deployment from codeship.
# In a codeship project, in the custom deployment window, enter this:

# chmod +x codeship_deploy.sh && ./codeship_deploy.sh

# This ensures that lines which have an error cause this whole script to
# exit with an error.
# http://stackoverflow.com/questions/3474526/stop-on-first-error
set -e

firebase deploy --token "${FIREBASE_TOKEN}" --project "saturn-perts"
