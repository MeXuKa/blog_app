import mongoose from 'mongoose';
import { User, getUsersDb, createUserDb } from '../dist/db/userDb.js';
import { expect } from 'chai';

describe('User test in the database', () => {
    before('Connecting to the database', async () => {
        await mongoose.connect('mongodb://localhost:27017/blog_test');
        await User.deleteMany({});
    });

    after('Closing the database connection', async () => {
        await mongoose.connection.close();
    });
    
    it('Returning users from the database', async () => {
        const users = await getUsersDb();
        expect(users).to.have.property('executionStats');
        expect(users.executionStats).to.have.property('nReturned').that.is.a('number');
    });

    it('Creating a user in the database', async () => {
        const user = await createUserDb('Max', 'max@gmail.com', '123');
        expect(user.username).to.equal('Max');
        expect(user.email).to.equal('max@gmail.com');
        expect(user.password).to.equal('123');
    });
});
