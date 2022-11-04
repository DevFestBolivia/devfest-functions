import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {getAttendeeByEmail} from "./firebase/fbAttendees";
import {registerNewUsersByIds, registerUserWithEmail} from "./firebase/firebaseAuth";

admin.initializeApp();

exports.registerNewUser = functions.firestore.document("/attendees/{id}").onCreate((snap) => {
    return registerUserWithEmail(snap);
});

exports.registerNewUsersByIds = functions.https.onRequest(async (req, res) => {
    const {ids = [], authCode = ""} = req.body;
    if (authCode == "authCode") {
        console.log("registerNewUsersByIds", ids);
        const users = await registerNewUsersByIds(ids)
        res.send(users);
    }
    res.send("Invalid authCode");
});

exports.loginWithGoogle = functions.https.onCall((data) => {
    const {id, email, displayName, photoUrl, serverAuthCode} = data;
    console.log("loginWithGoogle", id, email, displayName, photoUrl, serverAuthCode);
    return getAttendeeByEmail(email);
});
