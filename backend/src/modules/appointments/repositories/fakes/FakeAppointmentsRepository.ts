import Appointment from '../../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

/*No repositório fake iremos fazer todas as operações de um repositório normal porém
iremos utilizar somente o javascript puro, sem ORMs ou qualquer coisa que nos cause 
Dependencia e reescrita de codigo em caso de mudanças*/
class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    //Verificando se existe algum appointment que já foi cadastrado nesse mesmo horário
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointments = this.appointments.find(
            appointment => isEqual(appointment.date, date)
        )

        return findAppointments;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        //Forma 1
        Object.assign(appointment, { id: uuid(), date, provider_id})

        //Ou Forma 2
        // appointment.id = uuid();
        // appointment.date = date;
        // appointment.provider_id = provider_id;

        this.appointments.push(appointment);

        return appointment;
    }

}

export default AppointmentsRepository;
