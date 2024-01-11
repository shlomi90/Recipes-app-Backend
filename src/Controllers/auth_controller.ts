import { Request, Response } from 'express';
import auth_model from '../Models/user_model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/user_model';

const login = async (req: Request, res: Response) => {
    console.log("login");
    const email = req.body.email;
    const password = req.body.password;
    if (email==null || password==null) {
        return res.status(400).send("email or password not provided");
}
    try{
        const user= await auth_model.findOne({email:email});
        if(user==null){
           return res.status(400).send("email not found");
        }
        const match=await bcrypt.compare(password,user.password);
    if(!match){
        return res.status(400).send("wrong password");
    }
    const accessToken=  jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
    const refreshToken= jwt.sign({id:user._id},process.env.JWT_REFRESH);

    if(user.tokens==null)
    user.tokens=[refreshToken];
    else
    user.tokens.push(refreshToken);
    await user.save();
    return res.status(200).send
    ({'access token:':accessToken,
    'refresh token:':refreshToken});
}   catch(err){
        return res.status(400).send("error");
}}

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
}}

const refresh = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token==null) return res.sendStatus(401);
     jwt.verify(token,process.env.JWT_REFRESH,async (err:any,user:any)=>{
        if(err) return res.sendStatus(403).send(err.message);
        const user_id=user.id;
        try{
            user = await User.findById(user_id);
            if(user==null) return res.sendStatus(404).send("user not found");
            if(!user.tokens.includes(token))
            {
                user.tokens=[];
                await user.save();
                return res.sendStatus(403).send("token not found");
            }
            const accessToken=  jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
            const refreshToken= jwt.sign({id:user._id},process.env.JWT_REFRESH);

            user.tokens[user.tokens.indexOf(token)]=refreshToken;
            await user.save();
            return res.status(200).send
            ({'access token:':accessToken,
            'refresh token:':refreshToken});
        }
        catch(err){
            return res.status(400).send("error");
        }
     });








 
        // if(err) return res.sendStatus(403).send(err.message);
        // try{
        //     user=await user.findOne({_id:user_id});
        //     if(user==null) return res.sendStatus(404).send("user not found");
        //     if(!user.tokens.includes(token))
        //     {
        //         user.tokens=[];
        //         await user.save();
        //         return res.sendStatus(403).send("token not found");
        //     }

        //     const accessToken=  await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
        //     const refreshToken= await jwt.sign({id:user._id},process.env.JWT_REFRESH);

        //     user.tokens[user.tokens.indexOf(token)]=refreshToken;
        //     await user.save();
        //     return res.status(200).send
        //     ({'access token:':accessToken,
        //     'refresh token:':refreshToken});
        // } catch(err){
        //     return res.status(400).send("error");

        // }
 
    
}

const logout = async (req: Request, res: Response) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   if (token==null) return res.sendStatus(401);

   jwt.verify(token,process.env.JWT_REFRESH,async (err:any,user:any)=>{
    if(err) return res.sendStatus(403).send(err.message);
    const user_id=user.id;
    try{
        user= await user.findOne({_id:user_id});
        if(user==null) return res.sendStatus(404).send("user not found");
        if(!user.tokens.includes(token))
        {
            user.tokens=[];
            await user.save();
            return res.sendStatus(403).send("token not found");
        }
        user.tokens.splice(user.tokens.indexOf(token),1);
        await user.save();
        res .status(200).send("logout success");
    } catch(err){
        return res.status(400).send("error");

    }

});
}





export default { login, logout, register, refresh };

