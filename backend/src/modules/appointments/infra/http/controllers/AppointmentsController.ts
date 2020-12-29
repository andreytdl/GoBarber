import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController{
    public async create(request: Request, response: Response): Promise<Response>{
        
        const { provider_id, date } = request.body
        //formatando a data/horario para ser o inicio da hora (13:25 => 13:00)
        const parsedDate = parseISO(date);

        //Obtendo a função criadora de appointments - Utilizando o container que servirá para a injeção de dependencias
        const createAppointment = container.resolve(CreateAppointmentService);

        //Executando a função que cria appointments
        const appointment = await createAppointment.execute({date: parsedDate, provider_id})

        return response.json(appointment);
    }
}