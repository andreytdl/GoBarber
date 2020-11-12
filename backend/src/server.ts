import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import 'reflect-metadata';

import AppError from './errors/Error';
import 'express-async-errors';

import uploadConfig from './config/upload';

//importando o Typeorm
import './database';

import cors from 'cors';

const app = express();

//Liberando o uso de Json
app.use(express.json())

app.use(cors({
    // origin: 'http://localhost:3333'
}))

//Rota para acessar os nossos arquivos estáticos do frontend
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

//Tratativa de erros global
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    //Caso for um erro lançado pela nossa aplicação
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }

    //Caso seja algum erro interno na nossa api
    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });

});


app.get('/', (req, res) => {
    return res.json({'Opa': 'Meu Rei'});
})

app.get('/', (req, res) => {
    return res.json({'Opa': 'Meu Rei'});
})

app.listen(3333, () => {
    console.log('Server started on port 3333')
})
