import mongoose, { Types } from "mongoose";

export interface IPost {
    title: string;
    message: string;
    owner: string;
    _id?: string;
    createdAt?: Date;
}   

const postSchema = new mongoose.Schema<IPost>({
    title: {
        type: String
        , required: true
    },
    message: {
        type: String
        , required: true
    },
   owner: { 
       type:String
       ,required:true
    }
    , createdAt: {
        type: Date
        , default: Date.now
    }
});

export default mongoose.model<IPost>('Post', postSchema);
