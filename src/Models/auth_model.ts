import mongoose from "mongoose";

export interface IAuth {
    email: string;
    password: string;
}

const authSchema = new mongoose.Schema<IAuth>({
    email: {
        type: String
        , required: true
    },
    password: {
        type: String
        , required: true
    }
});

export default mongoose.model<IAuth>('Auth', authSchema);