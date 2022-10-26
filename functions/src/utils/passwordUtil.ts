export const generatePassword = (phoneNumber: string, fullName: string) => {
    const name = fullName.split(" ")[0];
    return `${phoneNumber}${name}`;
}
