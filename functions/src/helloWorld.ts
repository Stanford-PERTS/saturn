import * as functions from 'firebase-functions';
import * as jwt from 'jsonwebtoken';

const helloWorld = functions.https.onRequest((req, res) => {
  console.log('wassup'); //
  res.send(`Hello from Firebase!\n\n${Object.keys(jwt)}`);
});

export default helloWorld;
