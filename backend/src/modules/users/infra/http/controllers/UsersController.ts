import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe'
import CreateUserService from '@modules/users/services/CreateUserService';

//Para um controller ser RESTFULL, no max 5 itens ---
//index, show, create, update, delete

export default class UsersController{
    public async create(request: Request, response: Response): Promise<Response>{
        try{
            const { name, email, password } = request.body;
    
            const createUser = container.resolve(CreateUserService);
    
            const user = await createUser.execute({
                name,
                email,
                password,
            });
    
            //Removendo a senha da resposta
            delete user.password;
    
            return response.status(200).json(user);
        }catch(err){
            return response.status(400).json({ error : err.message} )
        }
    
    }
}