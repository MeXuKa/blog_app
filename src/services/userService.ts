import { User, UserInterface } from '../models/userModel.js';

export const getUsersDb = async () => {
    return await User.find().explain('executionStats');
}

export const getUserDb = async (id: string) => {
    return await User.findById(id).explain('executionStats');
}

export const createUserDb = async (username: string, email: string, password: string) => {
    return await User.create({ username, password, email});
}

export const checkUserDb = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
        const err = new Error('User not found.');
        (err as any).status = 404;
        throw err;
    }
    
    if (user.password !== password) {
        const err = new Error('Invalid password.');
        (err as any).status = 401;
        throw err;
    }
    
    return user;
}

export const updateUserDb = async (id: string, data: Partial<UserInterface>) => {
    return await User.findByIdAndUpdate(id, data, { new: true }).explain('executionStats');
}

export const deleteUserDb = async (id: string) => {
    await User.findOneAndDelete({ _id: id }).explain('executionStats');
}