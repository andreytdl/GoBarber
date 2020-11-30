import { animated } from 'react-spring';
import styled, { css } from 'styled-components';

interface ContainerProps {
    type?: 'success' | 'error' | 'info';
    hasDescription: boolean
}

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

export const Container = styled(animated.div)<ContainerProps>`
    width: 360px;
    position: relative;
    padding: 16px 30px 16px 16px;
    border-radius: 10px;
    // shadow, shadow, blur, shadow color and shadow opacity
    box-shadow: 20px 2px 8px rgba(0, 0, 0, 0.2);

    & + div {
        margin-top: 8px;
    }

    display: flex;

    //Variações de tipos '::grammar-error, 'success', 'info'
    ${(props) => toastTypeVariations[props.type || 'info']}

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

    ${props => !props.hasDescription && css `
        align-items: center;

        svg {
            margin-top: 0;
        }

    `}
`;