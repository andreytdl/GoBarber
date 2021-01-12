import AppError from '@shared/errors/Error';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';


describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        //Criando o repositório fake
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();

        /*instanciando o createAppointments porém passando o fakeRepository para que tudo 
        seja salvo na memoria Ao invés de salvar no typeorm*/
        const createAppointmentService = new CreateAppointmentService(
            fakeAppointmentsRepository
        );

        //Os dados não precisam ser reais, estamos apenas testando o service
        const appointment = await createAppointmentService.execute({
            date: new Date(),
            provider_id: '12345'
        })

        //Testes que provarão que o appointment foi criado
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('12345');


    })

   it('should not be able to create two appointments with the same time', async () => {
         //Criando o repositório fake
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();

        /*instanciando o createAppointments porém passando o fakeRepository para que tudo 
        seja salvo na memoria Ao invés de salvar no typeorm*/
        const createAppointmentService = new CreateAppointmentService(
            fakeAppointmentsRepository
        );

        //Criando um appointment para 10 de maio(Os meses começam em 0) de 2020 as 11 horas
        const appointmentDate = new Date(2020, 4, 10, 11)

        await createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '123456'
        })

        //Repare que aqui dentro não tem await
        expect(
            createAppointmentService.execute({
                date: appointmentDate,
                provider_id: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);

    })
    
})