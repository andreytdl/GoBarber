import AppError from '@shared/errors/Error';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';


describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        //Criando o repositório fake
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        /*instanciando o createUsers porém passando o fakeRepository para que tudo 
        seja salvo na memoria Ao invés de salvar no typeorm*/
        const authenticateUserService = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider
        );

        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

        await createUser.execute({
            name: 'John Doe',
            email: 'Johndoe@gmail.com',
            password: '12345',
        })

        //Os dados não precisam ser reais, estamos apenas testando o service
        const response = await authenticateUserService.execute({
            email: 'Johndoe@gmail.com',
            password: '12345'
        })

        //Testes que provarão que o user foi criado
        expect(response).toHaveProperty('token');

    })

    it('should not be able to authenticate user with wrong email', async () => {
        //Criando o repositório fake
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        /*instanciando o createUsers porém passando o fakeRepository para que tudo 
        seja salvo na memoria Ao invés de salvar no typeorm*/
        const authenticateUserService = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider
        );

        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

        await createUser.execute({
            name: 'John Doe',
            email: 'Johndoe@gmail.com',
            password: '12345',
        })

        //Testes que provarão que o user foi criado
        expect(authenticateUserService.execute({
            email: 'Johndo@gmail.com',
            password: '12345'
        })).rejects.toBeInstanceOf(AppError);

    }) 

    it('should not be able to authenticate user with wrong password', async () => {
        //Criando o repositório fake
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        /*instanciando o createUsers porém passando o fakeRepository para que tudo 
        seja salvo na memoria Ao invés de salvar no typeorm*/
        const authenticateUserService = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider
        );

        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

        await createUser.execute({
            name: 'John Doe',
            email: 'Johndoe@gmail.com',
            password: '12345',
        })

        //Testes que provarão que o user foi criado
        expect(authenticateUserService.execute({
            email: 'Johndoe@gmail.com',
            password: 'senha_errada'
        })).rejects.toBeInstanceOf(AppError);

    }) 
})