import User from '@modules/users/infra/typeorm/entities/User';

import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/Error';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {

    //SOLID
    /*D - DEPENDENCY INVERSION -> Ao invés de instanciar o repositório aqui dentro
    iremos recebe-lo por parâmetro */

    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {

        //Procurando usuários com o mesmo email
        const user = await this.userRepository.findByEmail(email)

        //Caso tenham usuários de mesmo e-mail
        if (!user) {
            throw new AppError("Incorrect Email/Password combination.", 401)
        }

        //user.password -> Senha criptografada
        //password -> senha não criptografada

        const passwordMatched = user.password ? await this.hashProvider.compareHash(password, user.password): undefined;

        if (!passwordMatched) {
            throw new AppError("Incorrect Email/Password combination.", 401)
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
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
