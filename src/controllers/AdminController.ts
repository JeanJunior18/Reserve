import { Request, Response, NextFunction } from 'express';
import knex from '../database';
import bcrypt from 'bcryptjs'; 

interface Admin {
  whatsapp: string
}

export default {
  async index(req:Request, res:Response, next:NextFunction){
    try {
      const usersAdmin = await knex('admin').where('deleted_at', null);
      return res.json(usersAdmin);
    } catch (error) {
      next(error)
    }
  },
  async store(req:Request, res:Response, next:NextFunction){
    try {
      const { name, email, password, whatsapp } = req.body;

      if((await knex('admin').where({email})).length)
        return res.status(403).json({error: "Email já cadastrado"})
      
      const hash = await bcrypt.hash(password, 5)

      await knex('admin').insert({ 
        name,
        email,
        whatsapp,
        password: hash,
      })

      return res.send()

    } catch (error) {
      next(error)
    }
  },
  async contact(req:Request, res:Response, next:NextFunction){
    const admin = await knex<Admin>('admin').first();
    const contact = admin?.whatsapp
    return res.json(contact)
  },
  async remove(req:Request, res:Response, next:NextFunction){
    try {
      const { user_id } = req.body;
      console.log(user_id)
      await knex('admin')
      .where('id', user_id)
      .update('deleted_at', new Date())

      return res.json()
    } catch (error) {
      next(error)    
    }
  }
}