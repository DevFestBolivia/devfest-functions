# **Dev Fest Firebase functions**

To start the firebase functions you must follow the steps below

- Step 1: install firebase tools globally with the command

  `npm install -g firebase-tools`

- Step 2: log in to the console with a firebase account with the command

  `firebase login`

- Step 3: Inside the project directory enter the functions folder and use the command

  `npm install`

- Step 4: Deploy the functions with the command

  `firebase deploy --only functions`

This will display the functions that are declared in the index.js

If you want to Deploy a single function use the command

`firebase deploy --only functions:nameFuction`

To delete a function use the command

`firebase functions:delete nameFuction`
