import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png'

export const Container = styled.div`
    /* 100% da parte visivel da tela para o usuário - "View Port Height" */
    height: 100vh;

    /* Deixa o conteúdo um ao lado do outro  */
    display: flex;

    /* Estica ao máximo que puder os elementos dentro (Como se fosse um vh para os elementos internos) */
    align-items: stretch; 
`;

export const Content = styled.div`
    /* Alinha Verticalmente */
    justify-content: center;
    /* Alinha Horizontalmente */
    align-items: center;

    display: flex;
    flex-direction:column;
    max-width: 700px;
    width: 100%;

`;

const appearFromLeft = keyframes`
    from{
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0px)
    }

`;

export const AnimationContainer = styled.div`
    /* Alinha Verticalmente */
    justify-content: center;
    /* Alinha Horizontalmente */
    align-items: center;
    
    display: flex;

    flex-direction:column;

    //Animation
    animation: ${appearFromLeft} 1s;
    

    form {
        margin: 80px 0;
        width: 340px;
        text-align:center;

        h1 {
            margin-bottom: 24px;
        }

        a {
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, '#F4EDE8')}
            }
        }
    }

    /* Somente o "a" deste nivel e não os outros "A's" do proximo nível (do forms por exemplo) */
    > a {
        color: #FF9000;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;

        display: flex;
        align-items: center;

        /* Distanciando o icone Fi do texto */
        svg {
            margin-right: 16px;
        }

        &:hover {
            color: ${shade(0.2, '#FF9000' )}
        }
    }

`;

export const Background = styled.div`
    /* Ocupa o resto da div permitido */
    flex: 1;
    /* Cobre a div inteira independentemente do tamanho da imagem */
    background-size: cover;
    
    background: url(${signInBackgroundImg}) no-repeat center
    
`;