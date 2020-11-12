import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

//Com essa ideia de container nós poderemos colocar o icone dentro do container mas não dentro do input
export const Container = styled.div<ContainerProps>`
        background: #232129;
        border-radius: 10px;
        padding: 16px;
        width: 100%;
        
        border: 2px solid #232129;
        color: #666360;

        /* Caso tenha alguma coisa errada no input deixaremos a borda vermelha */
        ${props => props.isErrored && css `
            border-color: #C53030;
        `}

        /* Caso o input esteja focado colocaremos esse efeito */
        ${props => props.isFocused && css `
            color: #FF9000;
            border-color: #FF9000;
        `}

        /* Caso tenha alguma coisa escrita no input deixaremos o icone colorido */
        ${props => props.isFilled && css `
            color: #FF9000;
        `}


        /* Semelhante a & + & só que não podemos colocar assim */
        & + div {
            margin-top: 8px;
        }

        /* Alinhando no centro  */
        display: flex;
        align-items: center;
        
        input {
            background: transparent;
            
            color: #f4ede8;
            /*Ocupando todo o espaço possível*/
            flex: 1;
            
            border: 0;
            
            /* Ta locão? nn pode, esse styles nn é só da pagina de login, mas estará em todos os inputs,
            Até mesmo onde o icone não se encontrar, portanto colocaremos a margin no icone, pois caso houver icone então
            haverá magin também */
            /*margin-left: 10px;*/

            &::placeholder {
                color: #666360;
            }

            & + input {
                margin-top: 8px;
            }

        }

        svg {
            margin-right: 16px;
        }

`;

//Dizendo que o Error é um tooltip e editando ele a partir dai
export const Error = styled(Tooltip)`
    
    height: 20px;
    margin-left: 16px;

    svg {
        margin: 0;
    }

    /* Deixando o tooltip vermelho por ser um tooltip de erro */
    span {
        background: #C53030;
        color: #FFF;

        &::before {
            border-color: #C53030 transparent;
        }
    }
`;