import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {getAttendeeByEmail} from "./firebase/fbAttendees";
import {getAllAttendeesEmails, registerNewUsersByIds, registerUserWithEmail} from "./firebase/firebaseAuth";

admin.initializeApp();

exports.registerNewUser = functions.firestore.document("/attendees/{id}").onCreate((snap) => {
    return registerUserWithEmail(snap);
});

exports.registerNewUsersByIds = functions.https.onRequest(async (req, res) => {
    const {ids = [], authCode = ""} = req.body;
    if (authCode == "5CRpWD62XWvNbeWZBGIf") {
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

exports.getAllAttendeesEmails = functions.https.onRequest(async (req, res) => {
    const { authCode = ""} = req.body;
    let result: string[] = [];
    if (authCode == "") {
        result = await getAllAttendeesEmails();
    }
    res.send(result);
});

exports.userExistsByEmail = functions.https.onRequest(async (req, res) => {
    const {email, authCode = ""} = req.body;
    if (authCode == "") {
        console.log("userExists", email);
        const attendee = await getAttendeeByEmail(email);
        res.send(attendee);
    }
});
