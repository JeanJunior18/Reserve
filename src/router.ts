import { Router, response } from 'express';
import auth from './services/auth'

import AdminController from './controllers/AdminController';
import ScheduleController from './controllers/ScheduleController';
import ServiceController from './controllers/ServiceController';
import AuthController from './controllers/AuthController';

const router = Router();


router
  .get('/contact', AdminController.contact)

  .post('/login', AuthController.login)
  .get('/isauth', auth, (req, res)=>res.send('ok'))

  .get('/admin', auth, AdminController.index)
  .post('/admin', auth, AdminController.store)
  .delete('/admin', auth, AdminController.remove)

  .get('/schedules/:id', ScheduleController.show)
  .get('/schedules', ScheduleController.index)
  .post('/schedules', auth, ScheduleController.store)
  .put('/schedules', ScheduleController.reserve)
  .put('/schedules/clear', auth, ScheduleController.clear)
  .delete('/schedules', ScheduleController.remove)

  .get('/services', ServiceController.index)
  .post('/services', auth, ServiceController.store)
  .put('/services/:id', auth, ServiceController.update)
  .delete('/services/:id', auth,ServiceController.delete)

export default router;