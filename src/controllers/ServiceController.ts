import { Request, Response, NextFunction } from 'express'
import knex from '../database';

export default {
  async index(req:Request, res:Response, next:NextFunction){
    try {
      const services = await knex('services')

      return res.json(services);
    } catch (error) {
      next(error)
    }
  }
}