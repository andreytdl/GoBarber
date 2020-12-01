import React, { useCallback,useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { Link, useHistory } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';
import { AnimationContainer } from './styles';

import api from '../../services/api'

import { useToast } from './../../hooks/Toast';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        //Fazendo a validação com o yup
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            password: Yup.string().min(6, 'No minimo 6 dígitos'),
            });

            //Realizando a validação - abortEarly serve para ele verificar todos os erros ao invés de ja encerrar no primeiro
            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data);

            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu logon',
            })

        }catch(err){
            //Caso seja erro do Yup
            if(err instanceof Yup.ValidationError){
                //Guardando os erros para serem mostrados no input
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }

            console.log("Toast")

            //Caso não for erro do Yup
            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
            });
        }
        console.log(data);
    }, [addToast, history])

    // useEffect(

    // , [])

    return (

    <Container>
        {/* Deixamos separado aqui em div pois assim poderemos mais tarde deixar responsivo */}
        <Background/>

        <AnimationContainer>
            <Content>
                {/* Imagem do barbeiro */}
                <img src = {logoImg} alt="GoBarber"/>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu Cadastro</h1>
                    
                    {/* Podemos criar a propriedade que quiser-mos e a passarmos por parâmetro - Por exemplo a "icon" */}
                    <Input icon={FiUser} name="name" placeholder="Nome"/>
                    <Input icon={FiMail} name="email" placeholder="E-mail"/>
                    <Input icon ={FiLock}
                        name = "password"
                        type="password"
                        placeholder="Senha"
                        />
                    
                    <Button type="submit">Cadastrar</Button>

                </Form>

                <Link to="/">
                    <FiArrowLeft/>
                    Voltar para logon
                </Link>

            </Content>
        </AnimationContainer>
        

    </Container>
    );
}

export default SignUp;