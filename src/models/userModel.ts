import mongoose, { Document } from 'mongoose';

export interface UserInterface extends Document {
    username: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema<UserInterface>({
    username: { type: String, required: true, unique: true },
    email: { type: String, match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], required: true, unique: true },
    password: { type: String, required: true },
});

export const User = mongoose.model<UserInterface>('User', userSchema);