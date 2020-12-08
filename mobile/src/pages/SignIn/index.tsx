import React from 'react';
import { Container, Title } from './styles';

import { Image } from 'react-native'

//Para retirar o erro foi necessário criar a pasta @types e declarar as imagens como exportaveis
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
    return (
        <Container>

            <Image source={logoImg}/>
            <Title>Faça seu logon</Title>


        </Container>
    );
}

export default SignIn;