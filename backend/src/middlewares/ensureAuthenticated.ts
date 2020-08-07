import { Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/Error';

interface TokenPayload {
    iat: number,
    exp: number,
    sub: string;
}

//Validação do token JWT
export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void{
    //Obtendo o token no header
    const authHeader = request.headers.authorization;

    //caso o usuário não esteja autenticado
    if(!authHeader){
        throw new AppError("JWT token is missing!", 401)
    }

    //Separando o "Bearer" do token
    const [, token] = authHeader.split(' ');

    //Como o verify lança um erro proprio colocaremos o try para criar a nossa propria mensagem no catch
    try{
        const decoded = verify(token, authConfig.jwt.secret);

        //Forçando o tipo da variável
        const { sub } = decoded as TokenPayload;

        //Aqui usamos o @type para modificar o request do express
        request.user = {
            id: sub,
        }

        //Caso autenticado pode prosseguir para a proxima rota
        return next();
    } catch{
        throw new AppError('invalid JWT token', 401);
    }


}
