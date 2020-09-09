import React, { ButtonHTMLAttributes }from 'react';

import { Container } from './styles';

//Permite receber proprieddades por parametro no botão -> Como o "type" do html
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

//Children -> Coisas passadas dentro do botão| ...rest -> todas as propriedades passadas
const Button: React.FC<ButtonProps> = ({children, ...rest}) => (
    /* Entre o type="button" e o {... rest} o react irá escolher o ultimo - colocamos o type aqui pq ele exige que exista um type */
    <Container type="button" {... rest}>
        {children}
    </Container>

);

export default Button;