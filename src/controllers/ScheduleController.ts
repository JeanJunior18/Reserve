import { Request, Response, NextFunction } from 'express'
import knex from '../database';

export default {
  async index(req:Request, res:Response, next:NextFunction){
    try {
      const schedule = await knex('schedules')

      return res.json(schedule)
    } catch (error) {
      next(error)
    }
  },
  async store(req:Request, res:Response, next:NextFunction){
    try {
      const { date } = req.body;
      const hour = new Date(date);
      
      await knex('schedules').insert({hour})
      console.log(hour, date)
      return res.json(hour)
    } catch (error) {
      next(error)
    }
  }
}