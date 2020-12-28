import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/Error';

interface Request {
    name: string,
    email: string,
    password: string;
}

class CreateUserService{
    public async execute({name, email, password}: Request): Promise<User> {

        //Através do Typeorm estou obtendo o repositório padrão de usuarios
        const userRepository = getRepository(User);

        //Procurando usuários com o mesmo email
        const checkUserExists = await userRepository.findOne({
            where: {email}
        })

        //Caso tenham usuários de mesmo e-mail
        if(checkUserExists){
            throw new AppError("Email address already used!", 400)
        }

        //Criptografando a senha
        const hashedPassword = await hash(password, 8);

        //Criando o usuário
        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword,
        })

        //Salvando no banco
        await userRepository.save(user);

        //Continuará sendo salvo no banco, porém não será retornado no response
        delete user.password;

        return user;
    }
}

export default CreateUserService;
