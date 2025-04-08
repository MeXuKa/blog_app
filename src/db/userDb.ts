import mongoose, { Document, Schema } from 'mongoose';

interface UserInterface extends Document {
    username: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema<UserInterface>({
    username: { type: String, required: true, unique: true },
    email: { type: String, match: [/\S+@\S+\.\S+/, 'Proszę wprowadzić poprawny adres e-mail'], required: true, unique: true },
    password: { type: String, required: true },
});

export const User = mongoose.model<UserInterface>('User', userSchema);

export const getUsersDb = async () => {
    return await User.find().explain('executionStats');
}

export const getUserDb = async (id: string) => {
    return await User.findById(id).explain('executionStats');
}

export const createUserDb = async (username: string, email: string, password: string) => {
    return await User.create({ username, password, email});
}

export const updateUserDb = async (id: string, data: Partial<UserInterface>) => {
    return await User.findByIdAndUpdate(id, data, { new: true }).explain('executionStats');
}

export const deleteUserDb = async (id: string) => {
    await User.findOneAndDelete({ _id: id }).explain('executionStats');
}