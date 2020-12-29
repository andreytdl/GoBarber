import { Router, request } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '../../typeorm/repositories/UserRepository';

//Preocupações da rota: Receber requisições, chamar outro arquivo para tratar e devolver uma resposta
const usersRouter = Router();

//Carregando o uploader do multer
const upload = multer(uploadConfig);


//Rota Principal - Criando usuário
usersRouter.post('/', async (req, res) => {
    
    try{
        const usersRepository = new UsersRepository();
        const { name, email, password } = req.body;

        const createUser = new CreateUserService(usersRepository);

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        //Removendo a senha da resposta
        delete user.password;

        return res.status(200).json(user);
    }catch(err){
        return res.status(400).json({ error : err.message} )
    }

});

//Realizando o upload de uma unica imagem
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    // Mostrando todas as informações da imagem enviada
    // console.log(req.file)

    const usersRepository = new UsersRepository();

    const UpdateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await UpdateUserAvatar.execute({
        user_id : request.user.id,
        avatarFilename: request.file.filename,
    });

    //Removendo a senha da resposta
    delete user.password;

    return response.json(user);

})

export default usersRouter;
