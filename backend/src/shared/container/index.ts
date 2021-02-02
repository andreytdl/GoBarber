import { container } from 'tsyringe';

import '@modules/users/providers'
import './providers'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository'

//Esse arquivo (Container) serve para colocar em prática a Inversão de Dependencias

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
     AppointmentsRepository
);

container.registerSingleton<IUserRepository>(
    'UsersRepository',
     UsersRepository
);