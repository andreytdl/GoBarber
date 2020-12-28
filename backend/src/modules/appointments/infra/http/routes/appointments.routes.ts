import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

//ParseIso: irá converter a timestamp enviada pelo insominia em Date() que é o nativo do JavaScript
//StartOfHour: irá obter essa mesma hora e setar os minutos, milissegundos etc em 0 deixando só o inicio da hora
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';


//Preocupações da rota: Receber requisições, chamar outro arquivo para tratar e devolver uma resposta
const appointmentsRouter = Router();

//Todas as rotas irão usar o nosso middleware
appointmentsRouter.use(ensureAuthenticated);

//Obter todos os appointments
appointmentsRouter.get('/', async (req, res) =>{
    //Obtendo o repositório e suas funções aqui
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    //Retornando todos os appointments salvos
    const appointments = await appointmentsRepository.find();

    return res.status(200).json(appointments);
})

//Rota Principal -> Como estamos usando um meno index.ts que indica que aqui é o lugar que deve ser salvo então não precisamos escrever as rotas por completo
appointmentsRouter.post('/', async (req, res) => {

    const { provider_id, date } = req.body
    //formatando a data/horario para ser o inicio da hora (13:25 => 13:00)
    const parsedDate = parseISO(date);

    //Obtendo a função criadora de appointments
    const createAppointment = new CreateAppointmentService();

    //Executando a função que cria appointments
    const appointment = await createAppointment.execute({date: parsedDate, provider_id})

    return res.json(appointment);

});


export default appointmentsRouter;
