import env from 'dotenv';
env.config();
import express,{Express} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoute from './Routing/user_route';
import postRoute from './Routing/post_route';
import authRoute from './Routing/auth_route';

const initApp=()=>{
    const promise = new Promise<Express>((resolve) => {
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => { console.log("DB connected 👍"); });
        mongoose.connect(process.env.DB_URL).then(() => {
            const app = express();
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use('/user', userRoute);
            app.use('/post', postRoute);
            app.use('/auth', authRoute);
        
            resolve(app);
    });
});
              return promise;
};






export default initApp;