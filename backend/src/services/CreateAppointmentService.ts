import Appointment from '../models/Appointments';
import { getCustomRepository } from 'typeorm';

import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import User from '../models/User';

interface RequestDTO{
    provider_id: string,
    date: Date;
}

class CreateAppointmentService {
    public async execute({ date, provider_id }: RequestDTO): Promise<Appointment>{
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date)

        //Se tudo der certo ele nos retornará os appointments existentes naquela data || retornará Null
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        //Caso retorne Null
        //O Service não tem acesso aos dados da requisição e aos dados da resposta, então enviaremos um erro pra cima
        if(findAppointmentInSameDate){
            throw Error('this appointment is already booked');
        }

        //Criando o appointment (Não está no banco de dados ainda)
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
