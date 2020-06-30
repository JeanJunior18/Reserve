import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config/token' 

declare global {
  namespace Express {
    interface Request {
      authorization: any
      user: any
    }
  }
}

export default (req:Request, res:Response, next:NextFunction) => {
  const { authorization } = req.headers;

  if(!authorization)
    return res.status(401).json({error: 'No token provided'});
 
  jwt.verify(authorization, config.secret, (err:any, decoded:any)=>{
    if(err)
      return res.status(401).json('Invalid Token');
    req.user = decoded;

    console.log('authenticated');
    return next();
  })
}