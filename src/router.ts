import { Router } from 'express';
import auth from './services/auth'

import AdminController from './controllers/AdminController';
import ScheduleController from './controllers/ScheduleController';
import ServiceController from './controllers/ServiceController';
import AuthController from './controllers/AuthController';

const router = Router();


router
  .post('/login', AuthController.login)

  .get('/admin', auth, AdminController.index)
  .post('/admin', auth, AdminController.store)

  .get('/schedules', ScheduleController.index)
  .post('/schedules', auth, ScheduleController.store)
  .put('/schedules', ScheduleController.reserve)

  .get('/services', ServiceController.index)
  .post('/services', auth, ServiceController.store)
  .put('/services/:id', auth, ServiceController.update)
  .delete('/services/:id', auth,ServiceController.delete)

export default router;