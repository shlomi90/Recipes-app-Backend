import request from 'supertest';
import initApp from '../app';
import mongoose from 'mongoose';
import User from '../Models/user_model';
import { Express } from 'express';

let app: Express;
beforeAll(async () => {
    app=await initApp();
    await User.deleteMany();
    
   
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();

});

const post = {
    title: "test post",
    message: "test message",
    owner: "test owner"
}

describe("POST /post", () => {
    test("should create a post", async () => {
        const response = await request(app).post("/post").send(post);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Data saved to database");
    });
    test("Try to create a post with missing data", async () => {
        const response = await request(app).post("/post").send({ title: "test post" });
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe("Unable to save data to database");
    });
    test("Try to create a post with empty data", async () => {
        const response = await request(app).post("/post").send({});
        expect(response.statusCode).toBe(500);
        expect(response.text).toBe("Unable to save data to database");
    });
}
);




