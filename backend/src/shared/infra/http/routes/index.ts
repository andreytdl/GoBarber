// src/routes/index.ts
import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes'

const routes = Router();

//Ao invés de deixar aqui deixaremos no .routes dos arquivos que irão utilizar, pois a nossa aplicação não utiliza esse filtro em tudo
//appointmentsRouter.use(ensureAuthenticated);

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);

export default routes;
