import { Router, request } from 'express';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

//Preocupações da rota: Receber requisições, chamar outro arquivo para tratar e devolver uma resposta
const usersRouter = Router();

//Carregando o uploader do multer
const upload = multer(uploadConfig);

//Rota Principal - Criando usuário
usersRouter.post('/', async (req, res) => {

    try{
        const { name, email, password } = req.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        return res.status(200).json(user);
    }catch(err){
        return res.status(400).json({ error : err.message} )
    }

});

//Realizando o upload de uma unica imagem
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    // Mostrando todas as informações da imagem enviada
    // console.log(req.file)

    const UpdateUserAvatar = new UpdateUserAvatarService();

    const user = await UpdateUserAvatar.execute({
        user_id : request.user.id,
        avatarFilename: request.file.filename,
    });

    //Removendo a senha da resposta
    delete user.password;

    return response.json(user);

})

export default usersRouter;
