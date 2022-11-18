import { firestore } from "firebase-admin";
import DocumentSnapshot = firestore.DocumentSnapshot;

export const getAttendeeByEmail = async (email: string) => {
    const snap = await firestore().collection("attendees").where("email", "==", email).get();
    console.log("getAttendeeByEmail", snap.docs.length);
    let attendee = null;
    if (snap.docs.length > 0) {
        attendee = snap.docs[0].data();
    }
    console.log("getAttendeeByEmail", attendee);
    return attendee;
};

export const getAttendeeById = async (id: string): Promise<DocumentSnapshot> => {
    const snap = await firestore().collection("attendees").doc(id).get();
    console.log("getAttendeeById", snap.exists);
    console.log("getAttendeeById", snap?.data()?.email);
    return snap;
}

export const getAllAttendees = async (): Promise<DocumentSnapshot[]> => {
    const snap = await firestore().collection("attendees").get();
    console.log("getAllAttendees", snap.docs.length);
    return snap.docs;
}
