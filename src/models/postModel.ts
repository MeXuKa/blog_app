import mongoose, { Document } from 'mongoose';

export interface PostInterface extends Document {
    title: string,
    body: string,
    createdAt: Date,
    userId: mongoose.Schema.Types.ObjectId
}

const postSchema = new mongoose.Schema<PostInterface>({
    title: { type: String, required: [true, 'Please add a title'] },
    body: { type: String, required: [true, 'Please add a body'] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
});

postSchema.index({ userId: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ userId: 1, createdAt: -1 });

export const Post = mongoose.model<PostInterface>('Post', postSchema);