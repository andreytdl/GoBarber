import { Router, response } from 'express';

import { container } from 'tsyringe'
import 'reflect-metadata';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UserRepository';
import SessionsController from '../controllers/SessionsController';

const sessionsController = new SessionsController();

const sessionsRouter = Router();

//Rota Principal -> Como estamos usando um meno index.ts que indica que aqui é o lugar que deve ser salvo então não precisamos escrever as rotas por completo
sessionsRouter.post('/', sessionsController.create);


export default sessionsRouter;
