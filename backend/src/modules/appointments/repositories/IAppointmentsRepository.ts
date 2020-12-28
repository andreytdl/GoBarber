import Appointments from '../infra/typeorm/entities/Appointments';

//SOLID
//Liskov Substitution Principle
export default interface IAppointmentsRepository{
    findByDate(date: Date): Promise<Appointments | undefined>
}