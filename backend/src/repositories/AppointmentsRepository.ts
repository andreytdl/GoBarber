import Appointment from '../models/Appointments';
import { EntityRepository, Repository } from 'typeorm';

//Responsável por operações em cima dos dados "(CRUD)"

//Avisando que estamos falando do repositório de Appointments - Colocamos a anotação somente pois queremos acrescentar metodos (listados abaixo) no nosso AppointmentsRepository
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

    //Verificando se existe algum appointment que já foi cadastrado nesse mesmo horário
    public async findByDate(date: Date): Promise<Appointment | null>{
        const findAppointment = await this.findOne({
            where: { date },
        })
        return findAppointment || null;
    }

}

export default AppointmentsRepository;
