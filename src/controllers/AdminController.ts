import { Request, Response, NextFunction } from 'express';
import knex from '../database';
import bcrypt from 'bcryptjs'; 


export default {
  async index(req:Request, res:Response, next:NextFunction){
    try {
      const usersAdmin = await knex('admin');
      return res.json(usersAdmin);
    } catch (error) {
      next(error)
    }
  },
  async store(req:Request, res:Response, next:NextFunction){
    try {
      const { name, email, password } = req.body;

      if((await knex('admin').where({email})).length)
        return res.status(403).json({error: "Email já cadastrado"})
      
      const hash = await bcrypt.hash(password, 5)

      await knex('admin').insert({ 
        name,
        email,
        password: hash,
      })

      return res.send()

    } catch (error) {
      next(error)
    }
  }
}