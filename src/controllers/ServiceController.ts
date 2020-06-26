import { Request, Response, NextFunction } from 'express'
import knex from '../database';

export default {
  async index(req:Request, res:Response, next:NextFunction){
    try {
      const services = await knex('services');

      return res.json(services);
    } catch (error) {
      next(error);
    }
  },
  async store(req:Request, res:Response, next:NextFunction){
    try {
      const { service_name, price } = req.body;
      await knex('services').insert({
        service_name,
        price,
      })

      return res.json();
    } catch (error) {
      next(error)
    }
  },
  async update(req:Request, res:Response, next:NextFunction){
    try {
      const { service_name, price } = req.body;
      const { id } = req.params;

      await knex('services')
      .update({
        service_name,
        price,
      })
      .where({ id });

      return res.json();
    } catch (error) {
      next(error);
    }
  },
  async delete(req:Request, res:Response, next:NextFunction){
    try {
      const { id } = req.params;
      const services = await knex('services')
      .where({id})
      .update('deleted_at', new Date());

      return res.json(services);
    } catch (error) {
      next(error);
    }
  },
}