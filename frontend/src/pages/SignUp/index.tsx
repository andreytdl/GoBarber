import React, { useEffect, useCallback,useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { Link } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';
import { AnimationContainer } from './styles';

const SignUp: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: object) => {
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

        }catch(err){
            
            //Guardando os erros para serem mostrados no input
            // formRef.current?.setErrors({
            //     name: 'Nome obrigatório',
            //     email: 'Email Obrigatório'
            // })

            //Guardando os erros para serem mostrados no input
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
        console.log(data);
    }, [])

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