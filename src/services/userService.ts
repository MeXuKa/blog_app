import bcrypt from 'bcryptjs';
import { User, UserInterface } from '../models/UserModel.js';
import AppError from '../utils/appError.js';

export const getUsersDb = async () => {
    return await User.find().explain('executionStats');
}

export const getUserDb = async (id: string) => {
    return await User.findById(id).explain('executionStats');
}

export const createUserDb = async (username: string, email: string, password: string) => {
    return await User.create({ username, email, password, role: 'user' });
}

export const checkUserDb = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) throw new AppError('User not found.', 404);
    if (!await bcrypt.compare(password, user.password)) throw new AppError('Invalid password.', 401);
    
    return user;
}

export const updateUserDb = async (id: string, data: Partial<UserInterface>) => {
    if (data.password) data.password = await bcrypt.hash(data.password, 10);

    return await User.findByIdAndUpdate(id, data, { new: true }).explain('executionStats');
}

export const deleteUserDb = async (id: string) => {
    await User.findOneAndDelete({ _id: id }).explain('executionStats');
}