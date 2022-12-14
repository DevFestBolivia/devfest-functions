import * as functions from "firebase-functions";
import { registerUserWithEmail } from "./firebase/firebaseAuth";
import * as admin from "firebase-admin";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.registerNewUser = functions.firestore.document("/attendees/{id}").onCreate((snap) => {
    return registerUserWithEmail(snap);
});
