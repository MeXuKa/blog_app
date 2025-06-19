import bcrypt from "bcryptjs";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const hashPassword = (password: string): Promise <string> => {
    return bcrypt.hash(password, 10);
}

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
}

export const checkPassword = (password: string): boolean => {
    return passwordRegex.test(password);
}