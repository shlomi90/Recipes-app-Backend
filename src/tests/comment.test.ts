// comments_controller.test.js
import  CommentController  from "../Controllers/comments_controller";
import  Post from "../Models/post_model";
import mongoose from "mongoose";
import request from 'supertest';
import initApp from '../app';
import { Express } from 'express';
import auth, { IUser } from '../Models/user_model';
import { IPost } from '../Models/post_model';
import Coment from "../Models/comments_model";

const user:IUser = {
    email:"test@comment.com",
     password:"123456789"
   };
   const user2:IUser = {
    email:"test@commentcreate.com",
     password:"123456789"
   };

    const post:IPost = {
        title: "title",
        message: "message",
        owner: "123123123"
    }
    
    let app: Express;
let token='';
beforeAll(async () => {
    app=await initApp();
    await Post.deleteMany();
    await auth.deleteMany({'email':user.email});
    await auth.deleteMany({'email':user2.email});
    await Coment.deleteMany(); 

    await request (app).post("/auth/register").send(user);
    const response2 = await request(app).post("/auth/login").send(user);
    token = response2.body['access token:']
    await request(app).post("/post").send(post).set('Authorization', "JWT " + token);
    await request(app).get("/auth/logout").set ("Authorization", "JWT " + token);

    const response4=await request(app).post("/auth/register").send(user2);
    user._id=response4.body._id;
    const response3 = await request(app).post("/auth/login").send(user2);
    token = response3.body['access token:']


});

afterAll(async () => {
    await mongoose.connection.close();  
    await mongoose.disconnect();
});

describe("POST /comment", () => {
    test ("should create a comment", async () => {
        const postId = (await Post.findOne())._id.toString();
        const commentData = { content: "This is a test comment" };
  
        const response = await request(app).post(`/post/${postId}/comments`).send(commentData)
        .set("Authorization", "JWT " + token);
  
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("content", commentData.content);
  
        // Optionally, verify that the comment is linked to the post:
        const updatedPost = await Post.findById(postId);
        expect(updatedPost.comments[0].toString()).toBe(response.body._id);
    });

    test("get all comments", async () => {
        const postId = (await Post.findOne())._id.toString();
        const response = await request(app).get(`/post/${postId}/comments`).set("Authorization", "JWT " + token);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty("content", "This is a test comment");
    });

    test("delete comment", async () => {
        const postId = (await Post.findOne())._id.toString();
        const commentId = (await Coment.findOne())._id.toString();
        const response = await request(app).delete(`/post/${postId}/comments/${commentId}`).set("Authorization", "JWT " + token);
        expect(response.status).toBe(200);
        expect(response.text).toBe("comment deleted");
    });

});








