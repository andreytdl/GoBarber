import User from '@modules/users/infra/typeorm/entities/User';

import path from 'path';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/Error';
import { inject, injectable } from 'tsyringe';

import fs from 'fs';
import IUserRepository from "../repositories/IUserRepository";

interface IRequest{
    user_id: string;
    avatarFilename: string;
}

injectable()
class UpdateUserAvatarService{

    //SOLID
    /*D - DEPENDENCY INVERSION -> Ao invés de instanciar o repositório aqui dentro
    iremos recebe-lo por parâmetro */
    
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
    ) { }

    public async execute({ user_id, avatarFilename }:IRequest): Promise<User>{
        const user = await this.userRepository.findById(user_id)

        if(!user){
            throw new AppError('Only authenticated users can change avatar!', 401)
        }

        //Caso o usuário ja tenha um avatar
        if( user.avatar ){

            //Caminho para o avatar do usuário na memória
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            //Verificando se o arquivo existe
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            //Caso exista então o deletaremos o arquivo antigo
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        //Linkando a nova imagem ao nosso avatar
        user.avatar = avatarFilename;

        await this.userRepository.save(user);

        return user;

    }

}

export default UpdateUserAvatarService
