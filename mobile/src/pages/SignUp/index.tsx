import React, { useRef, useCallback } from 'react';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

import Icon from 'react-native-vector-icons/Feather';

import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert } from 'react-native'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import api from '../../services/api';

//Para retirar o erro foi necessário criar a pasta @types e declarar as imagens como exportaveis
import logoImg from '../../assets/logo.png';

import { useNavigation } from '@react-navigation/native'

import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}


const SignUp: React.FC = () => {

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const formRef = useRef<FormHandles>(null);

    const handleSignUp = useCallback(async (data: SignUpFormData) => {
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

            //Caso não for erro do Yup
            Alert.alert(
                'Cadastro realizado com sucesso',
                'Você já pode fazer login na aplicação.',
            )

            navigation.navigate('SignIn')

        }catch(err){
            //Caso seja erro do Yup
            if(err instanceof Yup.ValidationError){
                //Guardando os erros para serem mostrados no input
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }

            //Caso não for erro do Yup
            Alert.alert(
                'Erro no cadastro',
                'Ocorreu um erro ao fazer cadastro.',
            )
        }
        console.log(data);
    }, [navigation])

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

                        <Form style={{width: '100%'}} ref={formRef} onSubmit={handleSignUp}>

                            <Input
                            autoCapitalize="words"
                            name="name" icon="user"
                            placeholder="Nome"
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                emailInputRef.current?.focus()
                            }}
                            />

                            <Input 
                            ref={emailInputRef}
                            autoCorrect={false}
                            autoCapitalize="none"
                            name="email" 
                            icon="mail" 
                            placeholder="E-mail" 
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                passwordInputRef.current?.focus()
                            }}
                            />

                            <Input 
                            ref={passwordInputRef}
                            secureTextEntry
                            name="password" 
                            icon="lock" 
                            placeholder="Senha" 
                            //Para o IOs parar de tentar gerar senha automaticamente
                            textContentType="newPassword"
                            returnKeyType="send"
                            onSubmitEditing={() => formRef.current?.submitForm()}
                            />

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