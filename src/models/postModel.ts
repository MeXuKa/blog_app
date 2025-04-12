import mongoose, { Document } from 'mongoose';

export interface PostInterface extends Document {
    title: string,
    body: string,
    createdAt: Date,
    userId: mongoose.Schema.Types.ObjectId
}

const postSchema = new mongoose.Schema<PostInterface>({
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

postSchema.index({ userId: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ userId: 1, createdAt: -1 });

export const Post = mongoose.model<PostInterface>('Post', postSchema);