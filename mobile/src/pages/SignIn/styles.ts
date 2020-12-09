import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper'

//Justify Content: Horizontal
//Align Items: Vertical
export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

//Fonte que está nos assets
export const Title = styled.Text`
    font-size: 24px;
    color: #f4ede8;
    font-family: 'Roboto-Medium';
    margin: 64px 0 24px;
`

//Não será rect button pois é só um texto
export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 24;
`
export const ForgotPasswordText = styled.Text`
    color: #F4EDE8;
    font-size: 16px;
    font-family: 'Roboto-Regular';
`

//Fazemos a verificação de se é um iphonex por causa do botão dele que ficará na frente do nosso botão atrapalhando
export const CreateAccountButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: #312e38;
    border-top-width: 1px;
    border-color: #232129;
    padding: 16px 0 ${16 + getBottomSpace()}px;

    justify-content: center;
    align-items: center;
    flex-direction: row;
`

export const CreateAccountButtonText = styled.Text`
    color: #FF9000;
    font-size: 18px;
    font-family: 'Roboto-Regular';
    margin-left: 16px;
`