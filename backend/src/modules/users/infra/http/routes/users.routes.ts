import { Router } from 'express';
import multer from 'multer';
import 'reflect-metadata';

import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import { container } from 'tsyringe';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

//Preocupações da rota: Receber requisições, chamar outro arquivo para tratar e devolver uma resposta
const usersRouter = Router();

//Carregando o uploader do multer
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();


//Rota Principal - Criando usuário
usersRouter.post('/', usersController.create);

//Realizando o upload de uma unica imagem
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

export default usersRouter;
