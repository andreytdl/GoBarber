import React from 'react';
import { Container, ButtonText } from './styles';
import { RectButtonProperties } from 'react-native-gesture-handler' 

interface ButtonProps extends RectButtonProperties {
    children: string;
}

//Aqui estamos pegando todas as propriedades do tipo RecButton e passando para o nosso Container de css
//Assim o container toma as decisões do que fazer com cada estado do botão
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
    <Container {...rest}>
        <ButtonText>{children}</ButtonText>
    </Container>
);

export default Button;