import { Router } from 'express';
import auth from './services/auth';
import { celebrate, Joi, Segments } from 'celebrate';

import AdminController from './controllers/AdminController';
import ScheduleController from './controllers/ScheduleController';
import ServiceController from './controllers/ServiceController';
import AuthController from './controllers/AuthController';

const router = Router();


router
  .post('/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
  }), AuthController.login)
  .get('/isauth', auth, (req, res)=>res.send('ok'))

router
  .get('/contact', AdminController.contact)
  .get('/admin', auth, AdminController.index)
  .post('/admin', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      whatsapp: Joi.string().required(),
    })
  }), auth, AdminController.store)
  .delete('/admin',celebrate({
    [Segments.BODY]: Joi.object().keys({
      user_id: Joi.string().required(),
    })
  }), auth, AdminController.remove)

router
  .get('/schedules/:id', celebrate({
      [Segments.PARAMS]: {
        id: Joi.number().required()
      }
  }), ScheduleController.show)
  .get('/schedules', ScheduleController.index)
  .post('/schedules', celebrate({
    [Segments.BODY]: Joi.object().keys({
      date: Joi.date().required()
    })
  }), auth, ScheduleController.store)
  .put('/schedules', celebrate({
    [Segments.BODY]: Joi.object().keys({
      schedule_id: Joi.number().required(),
      name: Joi.string().required(),
      whatsapp: Joi.string().required(),
      services: Joi.array().required()
    })
  }), ScheduleController.reserve)
  .put('/schedules/clear', celebrate({
    [Segments.BODY]: Joi.object().keys({
        schedule_id: Joi.number().required()
    })
  }), auth, ScheduleController.clear)
  .delete('/schedules',  celebrate({
    [Segments.BODY]: Joi.object().keys({
        schedule_id: Joi.number().required()
    })
  }), ScheduleController.remove)

router
  .get('/services', ServiceController.index)
  .post('/services', celebrate({
    [Segments.BODY]: Joi.object().keys({
      service_name: Joi.string().required(),
      price: Joi.number().required(),
    })
  }), auth, ServiceController.store)
  .put('/services/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
      service_name: Joi.string().required(), 
      price: Joi.number().required(),
    }),
    [Segments.PARAMS]: {
      id: Joi.number().required()
    }
  }), auth, ServiceController.update)
  .delete('/services/:id', celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required()
    }
  }), auth,ServiceController.delete)

export default router;