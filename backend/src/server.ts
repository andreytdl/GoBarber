import express from 'express';
import routes from './routes';
import 'reflect-metadata';

//importando o Typeorm
import './database';

const app = express();
app.use(express.json())
app.use(routes);

app.get('/', (req, res) => {
    return res.json({'Opa': 'Meu Rei'});
})

app.get('/', (req, res) => {
    return res.json({'Opa': 'Meu Rei'});
})

app.listen(3333, () => {
    console.log('Server started on port 3333')
})
