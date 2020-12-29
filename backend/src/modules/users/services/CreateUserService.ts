import { hash } from 'bcryptjs';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/Error';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
    name: string,
    email: string,
    password: string;
}

class CreateUserService{

    //SOLID
    /*D - DEPENDENCY INVERSION -> Ao invés de instanciar o repositório aqui dentro
    iremos recebe-lo por parâmetro */
    
    private userRepository: IUserRepository;
    
    constructor(
        userRepository: IUserRepository,
    ) {
        this.userRepository = userRepository;
    }


    public async execute({name, email, password}: IRequest): Promise<User> {

        //Procurando usuários com o mesmo email
        const checkUserExists = await this.userRepository.findByEmail(email)

        //Caso tenham usuários de mesmo e-mail
        if(checkUserExists){
            throw new AppError("Email address already used!", 400)
        }

        //Criptografando a senha
        const hashedPassword = await hash(password, 8);

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
