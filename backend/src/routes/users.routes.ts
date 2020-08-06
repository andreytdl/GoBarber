import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

//Preocupações da rota: Receber requisições, chamar outro arquivo para tratar e devolver uma resposta
const usersRouter = Router();

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


export default usersRouter;
