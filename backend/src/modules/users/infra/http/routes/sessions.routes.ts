import { Router, response } from 'express';


import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UserRepository';

const sessionsRouter = Router();

//Rota Principal -> Como estamos usando um meno index.ts que indica que aqui é o lugar que deve ser salvo então não precisamos escrever as rotas por completo
sessionsRouter.post('/', async (req, res) => {
    const usersRepository = new UsersRepository();
    
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService(usersRepository);

    const { user, token } = await authenticateUser.execute({
        email,
        password
    })

    delete user.password;

    return res.status(200).json({ user, token })

});


export default sessionsRouter;
