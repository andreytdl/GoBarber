import { Router, response } from 'express';

const sessionsRouter = Router();

import AuthenticateUserService from '../services/AuthenticateUserService';

import {  } from 'jsonwebtoken';

//Rota Principal -> Como estamos usando um meno index.ts que indica que aqui é o lugar que deve ser salvo então não precisamos escrever as rotas por completo
sessionsRouter.post('/', async (req, res) => {

    try{
        const { email, password } = req.body;

        const authenticateUser = new AuthenticateUserService;

        const { user, token } = await authenticateUser.execute({
            email,
            password
        })

        delete user.password;

        return res.status(200).json({ user, token })

    }catch(err){
        //Caso de algo errado retornaremos a mensagem do erro
        return res.status(400).json({ error: err.message })
    }

});


export default sessionsRouter;
