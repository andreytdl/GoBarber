import React from 'react';
import { Container, Title } from './styles';

import { Image } from 'react-native'

import Input from '../../components/Input'
import Button from '../../components/Button'

//Para retirar o erro foi necessário criar a pasta @types e declarar as imagens como exportaveis
import logoImg from '../../assets/logo.png';


const SignIn: React.FC = () => {
    return (
        <Container>

            <Image source={logoImg}/>
            <Title>Faça seu logon</Title>

            <Input name="email" icon="mail" placeholder="E-mail"/>
            <Input name="password" icon="lock" placeholder="Senha"/>

            <Button onPress={() => console.log('Ok')}>Entrar</Button>


        </Container>
    );
}

export default SignIn;