import { firestore } from "firebase-admin";
import { getAuth, UserRecord } from "firebase-admin/auth";
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

import { completePhoneNumber } from "../utils/phoneUtil";
import { generatePassword } from "../utils/passwordUtil";

export const registerUserWithEmail = async (snap: QueryDocumentSnapshot): Promise<boolean> => {
    const {email, id, fullName, phone} = snap.data();
    console.log("registerUserWithEmailPassword", email, id, fullName, phone);
    try {
        const user: UserRecord = await createAccountWithEmailPassword(id, email, fullName, phone);
        console.log("registerUserWithEmailPassword", user.email);
    } catch (e) {
        console.log("registerUserWithEmailPassword Error", e);
    }
    return true;
};

export const createAccountWithEmailPassword = async (id: string, email: string, fullName: string, phone: string): Promise<UserRecord> => {
    console.log("createAccountWithEmailPassword", email);
    const userRecord: UserRecord = await getAuth().createUser({
        uid: id,
        email,
        displayName: fullName,
        phoneNumber: completePhoneNumber(phone),
        emailVerified: true,
        password: generatePassword(phone, fullName),
        disabled: false
    });
    console.log("createAccountWithEmailPassword", userRecord.email);
    return userRecord;
}
