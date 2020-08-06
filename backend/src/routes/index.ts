// src/routes/index.ts
import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionRouter from './sessions.routes'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const routes = Router();

//Todas as rotas irão usar o nosso middleware
appointmentsRouter.use(ensureAuthenticated);

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);

export default routes;
