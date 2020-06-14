# Saturn

## Install Firebase

https://firebase.google.com/docs/cli#setup_update_cli

## Setup Notes

Had to grant this permission to the project's auto-generated service account for Google Cloud Functions ("gcf") before deploying would succeed. Note that the command hint in the error message was **wrong** as written. It recommended:

```
# WRONG command
gcloud projects add-iam-policy-binding saturn-perts \
--member=serviceAccount:service-557127412102@gcf-admin-robot.iam.gserviceaccount.com \
--role=cloudfunctions.serviceAgent
```

The correct command has `role/` in the path in the `--role` argument.

```
gcloud projects add-iam-policy-binding saturn-perts \
--member=serviceAccount:service-557127412102@gcf-admin-robot.iam.gserviceaccount.com \
--role=roles/cloudfunctions.serviceAgent
```

CM set up the MySQL user with:

```sql
CREATE USER 'saturn'@'localhost' IDENTIFIED BY 'saturn';
GRANT SELECT, INSERT, UPDATE, CREATE ON saturn.* TO 'saturn'@'%';
```

Also [set the default encoding and collation to support full utf8](
https://stackoverflow.com/questions/39463134/how-to-store-emoji-character-in-mysql-database/39465494#39465494):

```
ALTER DATABASE saturn CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin;
```

This means that deleting records or altering the tables will require root access.

## Environments

Cloud Functions have an [Environment Config](https://firebase.google.com/docs/functions/config-env) API we can use to store secret values in production.

We have set the key `env.deployed` to "true" and use this in utils to detect if the current environment `isDeployed()` or `isLocalhost()`.

Here are some examples of working with these values from the command line:

```
# Display all environment variable / config:
firebase functions:config:get

# Create/update a value:
firebase functions:config:set env.version="acceptance"

# Delete a value:
firebase functions:config:unset env.bad_param
```

These values are available from the function runtime like this:

```
import * as functions from 'firebase-functions';

functions.config();  // e.g. { env: { version: "acceptance" } }
```

If you need to use production config while local, you can export the config to a local file. ONLY DO THIS IF YOU'RE SURE, RUNNING FUNCTIONS LIKE THIS MIGHT CHANGE PRODUCTION DATA:

```
cd functions
firebase functions:config:get --project=saturn-perts > .runtimeconfig.json
```

## Emulate Firebase Locally

First time, you'll need to run the following command to have Firestore emulator
installed:

```
firebase setup:emulators:firestore
```

Once the Firestore emulator is downloaded and started, you can then stop it,
and start up all emulators with the following command:

```
firebase emulators:start
```

- Hosting (webserver with built/compiled files) http://localhost:5000
- Functions http://localhost:5001
- Firestore http://localhost:8080

## Local Development

```
npm start
```

In addition to the emulators listed above, this starts a webpack dev server on http://localhost:3000.

Or, if you'd like to run React webserver and Firebase emulators in separate
terminal windows, then you can separately run the following commands:

```
npm run start:firebase
npm run start:react
```

When developing Cloud Functions, it's helpful to run a separate typescript compiler on watch so that it updates with every save.

```
npx tsc -w
```

## Deploying

Various docs recommend deploying one function at a time to minimize i/o and quota use. This is not very useful for CD, but can be used locally:

```
firebase deploy --only functions:myCoolFn --project "saturn-perts"
```

### Hanging Codeship builds on function delete

If you code change removes a cloud function, the CLI will hang at a confirmation prompt in the Codeship build, without indication in the logs. If your intent is to remove the function, do `firebase deploy --project "saturn-perts"` locally first, and respond "Y" to the prompt about deleting the omitted function.

## Packages Used

-[React Icons](https://github.com/react-icons/react-icons)
