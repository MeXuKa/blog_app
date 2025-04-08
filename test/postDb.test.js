import mongoose from 'mongoose';
import { Post, getPostDb } from '../dist/db/postDb.js';
import { expect } from 'chai';

describe('Test posta w bazie danych', () => {
    before('Łączenie się z bazą danych', async () => {
        await mongoose.connect('mongodb://localhost:27017/blogApp_test');
        await Post.deleteMany({});
    });

    after('Zamknięcie połączenia z bazą danych', async () => {
        await mongoose.connection.close();
    });
    
    it('Zwracanie postów w bazie danych', async () => {
        const users = await getPostDb();
        expect(users).to.have.property('executionStats');
        expect(users.executionStats).to.have.property('nReturned').that.is.a('number');
    });
});
