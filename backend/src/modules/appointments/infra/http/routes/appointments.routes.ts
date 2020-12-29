import { Router } from 'express';

import 'reflect-metadata';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';


//Preocupações da rota: Receber requisições, chamar outro arquivo para tratar e devolver uma resposta
const appointmentsRouter = Router();

//Todas as rotas irão usar o nosso middleware
appointmentsRouter.use(ensureAuthenticated);

//Controller
const appointmentsController = new AppointmentsController();


//Obter todos os appointments
// appointmentsRouter.get('/', async (req, res) =>{
//     const appointmentsRepository = new AppointmentsRepository();
//     //Retornando todos os appointments salvos
//     const appointments = await appointmentsRepository.find();

//     return res.status(200).json(appointments);
// })
    
//Rota Principal -> Como estamos usando um meno index.ts que indica que aqui é o lugar que deve ser salvo então não precisamos escrever as rotas por completo
appointmentsRouter.post('/', appointmentsController.create);


export default appointmentsRouter;
