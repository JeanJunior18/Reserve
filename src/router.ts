import { Router } from 'express';

import AdminController from './controllers/AdminController';
import ScheduleController from './controllers/ScheduleController';
import ServiceController from './controllers/ServiceController';

const router = Router();

router
  .get('/admin', AdminController.index)
  .post('/admin', AdminController.store)

  .get('/schedules', ScheduleController.index)
  .post('/schedules', ScheduleController.store)
  .put('/schedules', ScheduleController.reserve)

  .get('/services', ServiceController.index)
  .post('/services', ServiceController.store)
  .put('/services/:id', ServiceController.update)
  .delete('/services/:id', ServiceController.delete)

export default router;