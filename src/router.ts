import { Router } from 'express';

import AdminController from './controllers/AdminController'
import ScheduleController from './controllers/ScheduleController'

const router = Router();

router
  .get('/admin', AdminController.index)
  .post('/admin', AdminController.store)
  .get('/schedules', ScheduleController.index)
  .post('/schedules', ScheduleController.store)

export default router;