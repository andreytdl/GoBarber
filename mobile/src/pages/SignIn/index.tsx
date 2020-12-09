import React, {useCallback, useRef} from 'react';
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';

import Icon from 'react-native-vector-icons/Feather';

import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import Input from '../../components/Input'
import Button from '../../components/Button'

//Para retirar o erro foi necessário criar a pasta @types e declarar as imagens como exportaveis
import logoImg from '../../assets/logo.png';

import { useNavigation } from '@react-navigation/native'

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    const handleSignIn = useCallback((data: object) => {
        console.log(data);
    }, []);

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
                            <Title>Faça seu logon</Title>
                        </View>

                        <Form style={{width: '100%'}} ref={formRef} onSubmit={handleSignIn}>

                            <Input name="email" icon="mail" placeholder="E-mail" />
                            <Input name="password" icon="lock" placeholder="Senha" />

                            <Button onPress={() => {
                                formRef.current?.submitForm();
                            }}>Entrar</Button>

                        </Form>


                        <ForgotPassword>

                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>

                        </ForgotPassword>


                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                <Icon name="log-in" size={20} color="#FF9000" />
                <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>

            </CreateAccountButton>
        </>

    );
}

export default SignIn;