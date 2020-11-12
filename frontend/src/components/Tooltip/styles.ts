import styled from 'styled-components';

export const Container = styled.div`

    position: relative;

    span {
        width: 160px;
        background: #FF9000;
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        color: #312e38;
        opacity: 0;
        transition: opacity 0.4s;
        visibility: hidden;

        position: absolute;
        bottom: calc(100% + 12px);
        
        /* Trazendo para a esquerda pela metade duas vezes, assim o elemento ficará no meio */
        left: 50%;
        transform: translateX(-50%);


        /* Triangulo feito no css pego no google */
        &::before {
            border-style: solid;
            border-color: #FF9000 transparent;
            border-width: 6px 6px 0 6px;
            bottom: 20px;
            top: 100%;
            position: absolute;
            
            /* Centralizando */
            left: 50%;
            transform: translateX(-50%);
        }

    }

    &:hover span {
        opacity: 1;
        visibility: visible;
    }

`;