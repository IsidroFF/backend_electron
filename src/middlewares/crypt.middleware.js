import bcrypt from "bcryptjs";

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    return secPass
}

export const decrypt = async (requestPassword, userPassword) => {
    const passwordCompare = await bcrypt.compare(requestPassword, userPassword);
    return passwordCompare;
}
