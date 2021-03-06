import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg'
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web';

import { useAuth } from '../../hooks/Auth';

import { Container, Content, AnimationContainer, Background } from './styles';
import { useToast } from '../../hooks/Toast';

import { Link, useHistory } from 'react-router-dom';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();

    const { addToast } = useToast();

    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        //Fazendo a validação com o yup
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
            email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            password: Yup.string().required("Senha obrigatória"),
            });

            //Realizando a validação - abortEarly serve para ele verificar todos os erros ao invés de ja encerrar no primeiro
            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password,
            });

            history.push('/dashboard');
            
        }catch(err){

            //Caso seja erro do Yup
            if(err instanceof Yup.ValidationError){
                //Guardando os erros para serem mostrados no input
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }

            //Caso não for erro do Yup
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
            });
        }

        console.log("No toast")

    }, [signIn, addToast, history])

    return (

        
        <Container>
        <Content>
            <AnimationContainer>

                {/* Imagem do barbeiro */}
                <img src = {logoImg} alt="GoBarber"/>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
                    
                    {/* Podemos criar a propriedade que quiser-mos e a passarmos por parâmetro - Por exemplo a "icon" */}
                    <Input icon={FiMail} name="email" placeholder="E-mail"/>
                    
                    <Input icon ={FiLock} name = "password" type="password" placeholder="Senha"/>
                    
                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>

                </Form>

                <Link to="/signup">
                    <FiLogIn/>
                    Criar conta
                </Link>

            </AnimationContainer>

        </Content>
        
        {/* Deixamos separado aqui em div pois assim poderemos mais tarde deixar responsivo */}
        <Background/>

    </Container>
);
}

export default SignIn;