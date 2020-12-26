import React, { useCallback, useRef } from 'react';
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';

import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';

import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert } from 'react-native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useAuth } from '../../hooks/Auth'

//Para retirar o erro foi necessário criar a pasta @types e declarar as imagens como exportaveis
import logoImg from '../../assets/logo.png';

import { useNavigation } from '@react-navigation/native'

import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const { signIn, user } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null)

    //Esse console log funcionaria todas as vezes que clicamos em "entrar"
    //Porque toda vez que a informação de um hook é atualizada ele irá renderizar
    //Novamente as coisas que dependem dele 
    console.log(user)


    const handleSignIn = useCallback(async (data: SignInFormData) => {
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

            //informação do hook sendo atualizada
            await signIn({
                email: data.email,
                password: data.password,
            });

        } catch (err) {

            //Caso seja erro do Yup
            if (err instanceof Yup.ValidationError) {
                //Guardando os erros para serem mostrados no input
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }

            //Caso não for erro do Yup
            Alert.alert(
                'Erro na autenticação',
                'Ocorreu um erro ao fazer login, cheque as credenciais.',
            )
        }

        console.log("No toast")

    }, [signIn])

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

                        <Form style={{ width: '100%' }} ref={formRef} onSubmit={handleSignIn}>

                            <Input
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                secureTextEntry
                                //Vai aparecer no cantinho do teclado uma opção de enviar
                                returnKeyType="send"
                                //O que vai acontecer quando apertar no enviar do teclado
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />

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