import AppError from '@shared/errors/Error';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        //Criando o repositório fake
        const fakeUserRepository = new FakeUserRepository();

        /*instanciando o createUsers porém passando o fakeRepository para que tudo 
        seja salvo na memoria Ao invés de salvar no typeorm*/
        const authenticateUserService = new AuthenticateUserService(
            fakeUserRepository
        );

        //Os dados não precisam ser reais, estamos apenas testando o service
        const user = await authenticateUserService.execute({
            email: 'Johndoe@gmail.com',
            password: '12345'
        })

        //Testes que provarão que o user foi criado
        expect(user).toHaveProperty('id');

    }) 
})