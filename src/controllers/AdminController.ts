import { Request, Response, NextFunction } from 'express'
import knex from '../database';

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

      await knex('admin').insert({ 
        name,
        email,
        password,
      })

      return res.send()

    } catch (error) {
      next(error)
    }
  }
}