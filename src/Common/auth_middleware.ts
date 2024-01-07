import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticate = (req:Request, res: Response, next:NextFunction) => {
  const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).send("Access Denied");
try{
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = verified;
    next();
}catch(err){
    res.status(400).send("Invalid Token");
}
}

export default authenticate;