import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IMailProvider from '../providers/MailProvider/models/IMailProvider';

import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
    email: string,
}

@injectable()
class SendForgotPasswordEmailService {

    constructor(

        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('MailProvider')
        private MailProvider: IMailProvider,

    ){}

    public async execute({ email }: IRequest): Promise<void> {
        this.MailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')
    }
}

export default SendForgotPasswordEmailService;
