import Appointment from '../entities/Appointments';
import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

//Responsável por operações em cima dos dados "(CRUD)"

//Avisando que estamos falando do repositório de Appointments - Colocamos a anotação somente pois queremos acrescentar metodos (listados abaixo) no nosso AppointmentsRepository
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> implements IAppointmentsRepository{

    //Verificando se existe algum appointment que já foi cadastrado nesse mesmo horário
    public async findByDate(date: Date): Promise<Appointment | undefined>{
        const findAppointment = await this.findOne({
            where: { date },
        })
        return findAppointment;
    }

}

export default AppointmentsRepository;
