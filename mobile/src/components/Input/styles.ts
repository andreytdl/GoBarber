import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps{
    isFocused: boolean;
    isErrored: boolean;
}

//flex-direction irá dizer se os icones ficam um em cima do outro ou lado a lado
export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 60px;
    padding: 0 16px;
    background: #232129;
    border-radius: 10px;
    margin-bottom: 8px;

    border-width: 2px;
    border-color: #232129;

    flex-direction: row;
    align-items: center;

    ${ props => props.isErrored && css`
        border-color: #c53030;
    `}

    ${ props => props.isFocused && css`
        border-color: #ff9000;
    `}

`;
export const TextInput = styled.TextInput`

    flex: 1;
    color: #FFF;
    font-size: 16px;
    font-family: 'Roboto-Regular';

`;

//Sempre que a tipagem for de fora do styled nós a colocaremos entre parenteses
export const Icon = styled(FeatherIcon)`
    margin-right: 16px;

`