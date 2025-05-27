import { Types } from 'mongoose';
import { Post, PostInterface } from '../models/postModel.js';

export const getPostsDb = async (id?: string) => {
    if (id) {
        const posts = await Post.aggregate([
            { $match: {userId: new Types.ObjectId(id) } },
            { $sort: { createdAt: -1 } },
            { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $project: { title: 1, body: 1, createdAt: 1, username: '$user.username' } }
        ]).explain('executionStats');
        
        const count: number = posts.length;
    
        return { posts, count };
    }

    return await Post.find().explain('executionStats');
}

export const getPostDb = async (id: string) => {
    return await Post.findById(id).populate('userId', 'username').explain('executionStats');
}

export const createPostDb = async (title: string, body: string, userId: string) => {
    return await Post.create({ title, body, userId});
}

export const updatePostDb = async (id: string, data: Partial<PostInterface>) => {
    return await Post.findByIdAndUpdate(id, data, { new: true }).explain('executionStats');
}

export const deletePostDb = async (id: string) => {
    await Post.findOneAndDelete({ _id: id }).explain('executionStats');
}