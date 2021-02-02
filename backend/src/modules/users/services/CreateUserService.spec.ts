import AppError from '@shared/errors/Error';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';


describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        //Criando o repositório fake
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();


        /*instanciando o createUsers porém passando o fakeRepository para que tudo 
        seja salvo na memoria Ao invés de salvar no typeorm*/
        const createUserService = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider
        );

        //Os dados não precisam ser reais, estamos apenas testando o service
        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'Johndoe@gmail.com',
            password: '12345'
        })

        //Testes que provarão que o user foi criado
        expect(user).toHaveProperty('id');

    }) 

    it('should not be able to create a new user with same email than another', async () => {
        //Criando o repositório fake
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();


        /*instanciando o createUsers porém passando o fakeRepository para que tudo 
        seja salvo na memoria Ao invés de salvar no typeorm*/
        const createUserService = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider
        );

        //Os dados não precisam ser reais, estamos apenas testando o service
        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'Johndoe@gmail.com',
            password: '12345'
        })

        //Testes que provarão que o user foi criado
        expect(
            createUserService.execute({
            name: 'John Doe',
            email: 'Johndoe@gmail.com',
            password: '12345'
        })).rejects.toBeInstanceOf(AppError)

    }) 
    
})