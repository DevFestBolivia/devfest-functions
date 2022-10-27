import {firestore} from "firebase-admin";
import {getAuth, UserRecord} from "firebase-admin/auth";
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

import {getAttendeeById} from "./fbAttendees";

export const registerUserWithEmail = async (snap: QueryDocumentSnapshot): Promise<boolean> => {
    const {email, id, fullName, phone} = snap.data();
    console.log("registerUserWithEmailPassword", email, id, fullName, phone);
    try {
        const user: UserRecord = await createAccountWithEmailPassword(id, email, fullName);
        console.log("registerUserWithEmailPassword", user.email);
    } catch (e) {
        console.log("registerUserWithEmailPassword Error", e);
    }
    return true;
};

export const registerNewUsersByIds = async (ids: string[]): Promise<UserRecord[]> => {
    const attendees = await Promise.all(ids.map(id => getAttendeeById(id)));

    const users: UserRecord[] = [];

    for (const attendee of attendees) {
        if (attendee !== null && attendee !== undefined && attendee.exists) {
            const attendeeData = attendee.data();
            const email = attendeeData?.email;
            const id = attendeeData?.id;
            const fullName = attendeeData?.fullName;
            const phone = attendeeData?.phone;
            console.log("registerNewUsersByIds", email, id, fullName, phone);

            try {
                const user: UserRecord = await createAccountWithEmailPassword(attendee.id, email, fullName)
                users.push(user);
            } catch (e) {
                console.log(`registerNewUsersByIds Error ${attendee.id}`, e);
            }
        }
    }

    return users;

}

export const createAccountWithEmailPassword = async (id: string, email: string, fullName: string): Promise<UserRecord> => {
    console.log("createAccountWithEmailPassword", email);
    const userRecord: UserRecord = await getAuth().createUser({
        uid: id,
        email,
        displayName: fullName,
        emailVerified: true,
        password: id,
        disabled: false
    });
    console.log("createAccountWithEmailPassword", userRecord.email);
    return userRecord;
}
