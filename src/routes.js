// const { Router } = require('express');
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => res.json({ message: "It's working" }));

// Users Resource
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.get('/providers', authMiddleware, ProviderController.index);
routes.get(
  '/providers/:providerId/available',
  authMiddleware,
  AvailableController.index
);

// Appointments Resource
routes.post('/appointments', authMiddleware, AppointmentController.store);
routes.get('/appointments', authMiddleware, AppointmentController.index);
routes.delete(
  '/appointments/:id',
  authMiddleware,
  AppointmentController.delete
);

// Schedule Resource
routes.get('/schedule', authMiddleware, ScheduleController.index);

// Files Resource
routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);

// Notifications Resource
routes.get('/notifications', authMiddleware, NotificationController.index);
routes.put('/notifications/:id', authMiddleware, NotificationController.update);

// Sessions Resource
routes.post('/sessions', SessionController.store);

// module.exports = routes;
export default routes;
