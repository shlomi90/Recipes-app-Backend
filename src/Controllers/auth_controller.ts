import { Request, Response } from 'express';
import auth_model from '../Models/auth_model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req: Request, res: Response) => {
    console.log("login");
    const email = req.body.email;
    const password = req.body.password;
    if (email==null || password==null) {
        return res.status(400).send("email or password not provided");
}
    try{
        const auth= await auth_model.findOne({email:email});
        if(auth==null){
           return res.status(400).send("email not found");
        }
        const match=await bcrypt.compare(password,auth.password);
    if(!match){
        return res.status(400).send("wrong password");
    }
    const token= jwt.sign({id:auth._id},
        process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
        
        return res.status(200).send({'access token:':token});
}   catch(err){
        return res.status(400).send("error");

}
}


const logout = async (req: Request, res: Response) => {
    console.log("logout");
    res.status(400).send("logout");
}

const register = async (req: Request, res: Response) => {
    console.log("register");
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
         return res.status(400).send("email or password not provided");
    }
    try{
        const exist= await auth_model.findOne({email:email});
        if(exist!=null){
           return res.status(400).send("email already exist");
        }
}   catch(err){
     return res.status(400).send("error");
} try{
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);
    const auth= await auth_model.create({email:email,password:hash});
    res.status(200).send(auth);
} catch(err){
    res.status(400).send("error");
}
}

export default { login, logout, register };

