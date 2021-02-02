import { hash } from 'bcryptjs';

import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/Error';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    name: string,
    email: string,
    password: string;
}

@injectable()
class CreateUserService {

    //SOLID
    /*D - DEPENDENCY INVERSION -> Ao invés de instanciar o repositório aqui dentro
    iremos recebe-lo por parâmetro */

    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }


    public async execute({ name, email, password }: IRequest): Promise<User> {

        //Procurando usuários com o mesmo email
        const checkUserExists = await this.userRepository.findByEmail(email)

        //Caso tenham usuários de mesmo e-mail
        if (checkUserExists) {
            throw new AppError("Email address already used!", 400)
        }

        //Criptografando a senha
        const hashedPassword = await this.hashProvider.generateHash(password);

        //Criando o usuário
        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        })

        return user;
    }
}

export default CreateUserService;
