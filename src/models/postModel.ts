import mongoose, { Schema, Types } from 'mongoose';

export interface PostInterface {
    title: string,
    body: string,
    userId: Types.ObjectId
}

const postSchema = new Schema<PostInterface>({
    title: { type: String, required: [true, 'Please add a title'] },
    body: { type: String, required: [true, 'Please add a body'] },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
});

postSchema.index({ userId: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ userId: 1, createdAt: -1 });

export const Post = mongoose.model<PostInterface>('Post', postSchema);