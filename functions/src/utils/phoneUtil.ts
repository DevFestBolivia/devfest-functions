export const completePhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.startsWith("+")) {
        return phoneNumber;
    }
    return `+591${phoneNumber}`;
}
