import { getRepository } from "typeorm";
import User from '../models/User';

import path from 'path';
import uploadConfig from '../config/upload';

import AppError from '../errors/Error';

import fs from 'fs';

interface Request{
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService{

    public async execute({ user_id, avatarFilename }:Request): Promise<User>{
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(user_id);

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

        await userRepository.save(user);

        return user;

    }

}

export default UpdateUserAvatarService
