import request from 'supertest';
import initApp from '../app';
import mongoose from 'mongoose';
import User from '../Models/user_model';
import { Express } from 'express';
import auths from '../Models/auth_model';

let app: Express;
beforeAll(async () => {
    app=await initApp();
    await auths.deleteMany();

});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();

});

describe('Auth tests', () => {
    test('Register test', async () => {
        const response = await request(app).post('/auth/register').send({
           email: "test",
           password: "test"
        });
        expect(response.status).toBe(200);
    })  
    test ('Try to register with same email', async () => {
        const response = await request(app).post('/auth/register').send({
            email: "test",
            password: "test"
         });
         expect(response.status).toBe(400);
    })
    
    test('Login test', async () => {
        const response = await request(app).post('/auth/login').send({
           email: "test",
           password: "test"
        });
        expect(response.status).toBe(200);
        const token = response.body['access token:'];
        expect(token).not.toBeNull();
        const response2 = await request(app).get('/post').set('Authorization', "JWT " + token);
        expect(response2.status).toBe(200);
        const response3 = await request(app).get('/post').set('Authorization', "JWT 1 " + token);
        expect(response3.status).toBe(400);
    
    })
    // test('Logout test', async () => {
    //     const response = await request(app).post('/auth/logout').send({
    //        email: "test",
    //        password: "test"
    //     });
    //     expect(response.status).toBe(200);
    // })
     
})
