import Appointment from '../entities/Appointment';
import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {

    private ormRepository: Repository<Appointment>

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    //Verificando se existe algum appointment que já foi cadastrado nesse mesmo horário
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        })
        return findAppointment;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        //Criando o appointment (Não está no banco de dados ainda)
        const appointment = this.ormRepository.create({
            provider_id,
            date,
        });

        await this.ormRepository.save(appointment);

        return appointment;
    }

}

export default AppointmentsRepository;
