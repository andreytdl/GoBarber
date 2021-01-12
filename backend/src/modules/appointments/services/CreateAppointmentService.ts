import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import { startOfHour } from 'date-fns';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/Error';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO{
    provider_id: string,
    date: Date;
}

//Isso permite a classe receber injeção de dependencia
@injectable()
class CreateAppointmentService {
    
    //SOLID
    /*D - DEPENDENCY INVERSION -> Ao invés de instanciar o repositório aqui dentro
    iremos recebe-lo por parâmetro */
    
    private appointmentsRepository: IAppointmentsRepository;
    
    constructor(
        //Aqui fazemos a injeção de dependencia
        @inject('AppointmentsRepository')
        appointmentsRepository: IAppointmentsRepository,
    ) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public async execute({ date, provider_id }: IRequestDTO): Promise<Appointment>{
        const appointmentDate = startOfHour(date)

        //Se tudo der certo ele nos retornará os appointments existentes naquela data || retornará Null
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        //Caso retorne Null
        //O Service não tem acesso aos dados da requisição e aos dados da resposta, então enviaremos um erro pra cima
        if(findAppointmentInSameDate){
            throw new AppError('this appointment is already booked');
        }

        //Criando o appointment (Não está no banco de dados ainda)
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;