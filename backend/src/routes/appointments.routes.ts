import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

//ParseIso: irá converter a timestamp enviada pelo insominia em Date() que é o nativo do JavaScript
//StartOfHour: irá obter essa mesma hora e setar os minutos, milissegundos etc em 0 deixando só o inicio da hora
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';


//Preocupações da rota: Receber requisições, chamar outro arquivo para tratar e devolver uma resposta
const appointmentsRouter = Router();

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

    try{
        const { provider_id, date } = req.body
        //formatando a data/horario para ser o inicio da hora (13:25 => 13:00)
        const parsedDate = parseISO(date);

        //Obtendo a função criadora de appointments
        const createAppointment = new CreateAppointmentService();

        //Executando a função que cria appointments
        const appointment = await createAppointment.execute({date: parsedDate, provider_id})

        return res.json(appointment);
    }catch(err){
        //Caso de algo errado retornaremos a mensagem do erro
        return res.status(400).json({ error: err.message })
    }

});


export default appointmentsRouter;
