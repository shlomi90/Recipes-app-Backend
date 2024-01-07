import request from 'supertest';
import initApp from '../app';
import mongoose from 'mongoose';
import User from '../Models/user_model';
import { Express, response } from 'express';
import auth from '../Models/auth_model';

let app: Express;
let token: string;
beforeAll(async () => {
    app=await initApp();
    await User.deleteMany();
    await auth.deleteMany();
    await request(app).post('/auth/register').send({
         username: "test",
          password: "test"
         });
    const response= await request(app).post('/auth/login').send({
         username: "test",
          password: "test"
         });
    token=response.body['access token:'];

});



afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();

});

const user = {
    name: "Tes1",
    _id: "123456789",
};

describe('User test', () => {
    test('should return an empty array', async () => {
        const response = await request(app).get('/user');
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    })

    test('should create a user', async () => {
        const response = await request(app).post('/user').send(user);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Data saved to database');
    })

    test('should return an array with 1 user', async () => {
        const response = await request(app).get('/user');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const user = response.body[0];
        expect(user.name).toBe(user.name);
        expect(user._id).toBe(user._id);
    })

    test('create duplicate user', async () => {
        const response = await request(app).post('/user').send(user);
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('Unable to save data to database');
    })

    test('get user by id', async () => {
        const response = await request(app).get(`/user/${user._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(user.name);
        expect(response.body._id).toBe(user._id);
    })

    test('delete user by id', async () => {
        const response = await request(app).delete(`/user/${user._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Data deleted from database');
    })
    test('try to create user with missing name', async () => {
        const response = await request(app).post('/user').send({ _id: user._id });
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('Unable to save data to database');
    })
    test('try to create user with missing _id', async () => {
        const response = await request(app).post('/user').send({ name: user.name });
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('Unable to save data to database');
    })
    test('try to create user with missing name and _id', async () => {
        const response = await request(app).post('/user').send({});
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe('Unable to save data to database');
    })
    test('put user', async () => {
        const response = await request(app).put(`/user/${user._id}`).send(user);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Data updated in database');
    })
    test('try to put user with missing name', async () => {
        const response = await request(app).put(`/user/${user._id}`).send({ _id: user._id });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Both name and _id are required');
    })


})