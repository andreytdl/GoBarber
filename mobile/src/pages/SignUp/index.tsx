import React, { useRef } from 'react';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

import Icon from 'react-native-vector-icons/Feather';

import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

//Para retirar o erro foi necessário criar a pasta @types e declarar as imagens como exportaveis
import logoImg from '../../assets/logo.png';

import { useNavigation } from '@react-navigation/native'

const SignUp: React.FC = () => {

    const navigation = useNavigation();

    const formRef = useRef<FormHandles>(null);

    return (
        <>
            {/* No caso do android já temos o keyboard avoiding sempre habilitado */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>

                        <Image source={logoImg} />
                        {/* O Keyboard Avoiding não funciona em textos, então colocaremos o texto colocaremos na view */}
                        <View>
                            <Title>Crie sua conta</Title>
                        </View>

                        <Form style={{width: '100%'}} ref={formRef} onSubmit={() => console.log('ata')}>

                            <Input name="name" icon="user" placeholder="Nome" />
                            <Input name="email" icon="mail" placeholder="E-mail" />
                            <Input name="password" icon="lock" placeholder="Senha" />

                            <Button onPress={() => formRef.current?.submitForm()}>Cadastrar</Button>

                        </Form>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignIn onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#FFF" />
                <BackToSignInText>Voltar para logon</BackToSignInText>

            </BackToSignIn>
        </>

    );
}

export default SignUp;