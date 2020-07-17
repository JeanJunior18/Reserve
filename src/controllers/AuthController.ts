import { Request, Response, NextFunction } from 'express'
import knex from '../database'; 
import jwt from 'jsonwebtoken';
import config from '../config/token';
import bcrypt from 'bcryptjs';

const generateToken = (params={})=> {
  return jwt.sign(params, config.secret)
}

interface User {
  id: number
  name: string
  password: string
  email: string
}

export default {
  async login(req:Request, res:Response, next:NextFunction){
    try {
      const {email, password} = req.body;
      
      const user = await knex<User>('admin').where({email}).where('deleted_at', null).first()
      
      if(!user)
        return res.status(401).json({error: 'Usuário não encontrado'})

      if(await bcrypt.compare(password, user.password)){
        user['password'] = ''
        let id = user.id
        let name = user.name
        let token = generateToken({ id, name })
        req.authorization = token
        return res.json(token)
      }
      else
        return res.status(401).json({error: 'Senha Incorreta'})
      

    } catch (error) {
      next(error)
    }
  },
}
