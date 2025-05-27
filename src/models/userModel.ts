import mongoose, { Schema } from 'mongoose';

export interface UserInterface {
    username: string,
    email: string,
    password: string,
    role: 'user' | 'admin'
}

const userSchema = new Schema<UserInterface>({
    username: { type: String, required: [true, 'Please add a name'], unique: true },
    email: { type: String, match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], required: [true, 'Please add an email'], unique: true },
    password: { type: String, required: [true, 'Please add a password'] },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {
    timestamps: true
});

export const User = mongoose.model<UserInterface>('User', userSchema);