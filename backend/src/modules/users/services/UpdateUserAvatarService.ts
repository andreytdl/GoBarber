import User from '@modules/users/infra/typeorm/entities/User';

import path from 'path';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/Error';
import { inject, injectable } from 'tsyringe';

import fs from 'fs';
import IUserRepository from "../repositories/IUserRepository";
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

injectable()
class UpdateUserAvatarService {

    //SOLID
    /*D - DEPENDENCY INVERSION -> Ao invés de instanciar o repositório aqui dentro
    iremos recebe-lo por parâmetro */

    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,

    ) { }

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(user_id)

        if (!user) {
            throw new AppError('Only authenticated users can change avatar!', 401)
        }

        //Caso o usuário ja tenha um avatar deletamos para salvar o novo
        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar)
        }

        //Salvamos o novo avatar
        const fileName = await this.storageProvider.saveFile(avatarFilename)

        //Linkando a nova imagem ao nosso avatar
        user.avatar = fileName;

        await this.userRepository.save(user);

        return user;

    }

}

export default UpdateUserAvatarService
