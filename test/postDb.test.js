import mongoose from 'mongoose';
import { Post, getPostDb } from '../dist/db/postDb.js';
import { expect } from 'chai';

describe('Post test in the database', () => {
    before('Connecting to the database', async () => {
        await mongoose.connect('mongodb://localhost:27017/blog_test');
        await Post.deleteMany({});
    });

    after('Closing the database connection', async () => {
        await mongoose.connection.close();
    });
    
    it('Returning posts from the database', async () => {
        const users = await getPostDb();
        expect(users).to.have.property('executionStats');
        expect(users.executionStats).to.have.property('nReturned').that.is.a('number');
    });
});
