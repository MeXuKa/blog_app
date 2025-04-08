import mongoose from 'mongoose';
import { User, getUsersDb, createUserDb } from '../dist/db/userDb.js';
import { expect } from 'chai';

describe('Test użytkownika w bazie danych', () => {
    before('Łączenie się z bazą danych', async () => {
        await mongoose.connect('mongodb://localhost:27017/blogApp_test');
        await User.deleteMany({});
    });

    after('Zamknięcie połączenia z bazą danych', async () => {
        await mongoose.connection.close();
    });
    
    it('Zwracanie użytkowników w bazie danych', async () => {
        const users = await getUsersDb();
        expect(users).to.have.property('executionStats');
        expect(users.executionStats).to.have.property('nReturned').that.is.a('number');
    });

    it('Tworzenie użytkownika w bazie danych', async () => {
        const user = await createUserDb('Max', 'max@gmail.com', '123');
        expect(user.username).to.equal('Max');
        expect(user.email).to.equal('max@gmail.com');
        expect(user.password).to.equal('123');
    });
});
