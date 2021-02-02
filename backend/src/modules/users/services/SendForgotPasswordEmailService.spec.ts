import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import FakeMailProvider from '../providers/MailProvider/fakes/FakeMailProvider';
import CreateUserService from './CreateUserService';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';


describe('SendForgotPasswordEmail', () => {

    it('should be able to recover the password using the email', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUserRepository, fakeMailProvider);

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com'
        });

        expect(sendMail).toHaveBeenCalled();

    })
})