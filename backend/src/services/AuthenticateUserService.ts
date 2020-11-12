import { getRepository } from 'typeorm';
import User from '../models/User';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/Error';

interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string;
}

class AuthenticateUserService{
    public async execute({email, password}: Request): Promise<Response>{
        //Através do Typeorm estou obtendo o repositório padrão de usuarios
        const userRepository = getRepository(User);

        //Procurando usuários com o mesmo email
        const user = await userRepository.findOne({
            where: {email}
        })

        //Caso tenham usuários de mesmo e-mail
        if(!user){
            throw new AppError("Incorrect Email/Password combination.", 401)
        }

        //user.password -> Senha criptografada
        //password -> senha não criptografada

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError("Incorrect Email/Password combination.", 401)
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ }, secret, {
            subject: user.id,
            expiresIn: expiresIn
        });

        return {
            user,
            token,
        }
    }
}

export default AuthenticateUserService;
