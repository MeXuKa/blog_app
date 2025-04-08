import mongoose, { Document, Schema } from 'mongoose';

interface PostInterface extends Document {
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

export const getPostsDb = async (id?: string) => {
    if (id) {
        const posts = await Post.aggregate([
            { $match: {userId: new mongoose.Types.ObjectId(id) } },
            { $sort: { createdAt: -1 } },
            { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $project: { title: 1, body: 1, createdAt: 1, username: '$user.username' } }
        ]).explain('executionStats');
        
        const count = posts.length;
    
        return { posts, count };
    }

    return await Post.find().explain('executionStats');
}

export const getPostDb = async (id: string) => {
    return await Post.findById(id).populate('userId', 'username').explain('executionStats');
}

export const createPostDb = async (title: string, body: string, userId: mongoose.Schema.Types.ObjectId) => {
    return await Post.create({ title, body, userId});
}

export const updatePostDb = async (id: string, data: Partial<PostInterface>) => {
    return await Post.findByIdAndUpdate(id, data, { new: true }).explain('executionStats');
}

export const deletePostDb = async (id: string) => {
    await Post.findOneAndDelete({ _id: id }).explain('executionStats');
}