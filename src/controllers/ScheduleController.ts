import { Request, Response, NextFunction } from 'express'
import knex from '../database';

export default {
  async show(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;
    
    // const schedule = await knex('schedules').where('id', id).first()

    // if(!schedule)
    //   return res.status(404).json({error: 'Schedule not found'})

    const service = await knex('services')
      .join('schedules_service', 'services.id', '=', 'schedules_service.service_id')
      .where('schedules_service.schedule_id', id)
    

    return res.json(service)
  },
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
  },
  async reserve(req:Request, res:Response, next:NextFunction){
    try {
      const { schedule_id, name, whatsapp, services } = req.body;

      knex('schedules').where('id', schedule_id).first().then(async (response) => {
        if(response.name !== null){
          return res.status(401).json({error: 'Este horário já foi reservado'})
        }
        else{
          const trx = await knex.transaction();
          
          const updated = await trx('schedules')
          .update({ name, whatsapp })
          .where({ id: schedule_id })
    
          const services_items = services
          .map((service_id:number) => {
            return {
              schedule_id,
              service_id
            }
          })
    
    
          await trx('schedules_service').insert(services_items)
          trx.commit()
    
          return res.json(updated)
        }
      })


    } catch (error) {
      next(error);
    }
  },
  async clear(req:Request, res:Response, next:NextFunction){
    try {
      const { schedule_id } = req.body;

      const trx = await knex.transaction();
      
      await trx('schedules')
      .update({ name:null, whatsapp:null })
      .where({ id: schedule_id })

      await trx('schedules_service').del().where({schedule_id})
      trx.commit()

      return res.json()
    } catch (error) {
      next(error)
    }
  },
  async remove(req:Request, res:Response, next:NextFunction){
    try {
      const { schedule_id } = req.body;

      const trx = await knex.transaction();
      
      await trx('schedules_service').del().where({schedule_id})
      
      await trx('schedules').del().where({ id: schedule_id })

      trx.commit()

      return res.json()
    } catch (error) {
      next(error)
    }
  }

}