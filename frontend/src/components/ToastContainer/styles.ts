import styled, { css } from 'styled-components';

interface ToastProps {
    type?: 'success' | 'error' | 'info';
}

export const Container = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    padding: 30px;
    //Esconde aquilo que sair de dentro da div
    overflow: hidden;
`;

const toastTypeVariations = {
    info: css`
        background: #ebf8ff;
        color: #3172b7;
    `,
    
    success: css`
        background: #e6fffa;
        color: #2e656a;
    `,
    
    error: css`
        background: #fddede;
        color: #c53030;
    `
}

export const Toast = styled.div<ToastProps>`
    width: 360px;
    position: relative;
    padding: 16px 30px 16px 16px;
    border-radius: 10px;
    // shadow, shadow, blur, shadow color and shadow opacity
    box-shadow: 20px 2px 8px rgba(0, 0, 0, 0.2);

    display: flex;

    //Variações de tipos '::grammar-error, 'success', 'info'
    ${(props) => toastTypeVariations[props.type || 'info']}

    background: #ebf8ff;
    color: #3172b7;

    > svg{
        margin: 4px 12px 0 0;
    }

    div {
        flex: 1;

        p {
            margin-top: 4px;
            font-size: 14px;
            opacity: 0.8;
            line-height: 20px;
        }
    }

    button {
        position: absolute;
        right: 8px;
        top: 15px;
        opacity: 0.6;
        border: 0ch;
        background: transparent;
        color: inherit;
    }
`;