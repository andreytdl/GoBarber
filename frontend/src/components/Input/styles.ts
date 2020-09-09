import styled from 'styled-components';

//Com essa ideia de container nós poderemos colocar o icone dentro do container mas não dentro do input
export const Container = styled.div`
        background: #232129;
        border-radius: 10px;
        border: 2px solid #232129;
        padding: 16px;
        width: 100%;
        
        /* Semelhante a & + & só que não podemos colocar assim */
        & + div {
            margin-top: 8px;
        }

        /* Alinhando no centro  */
        display: flex;
        align-items: center;
        
        input {
            background: transparent;
            
            color: #666360;
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