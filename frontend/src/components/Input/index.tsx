import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
 
import { Container } from './styles';

//Tipando o input para que ele possa receber propriedades como placeholder, type, etc
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

//Repare que a tipagem é passada aqui também | e as propriedades são pegas
//icon é renomeado para Icon para que o react o entenda como componente
const Input: React.FC<InputProps> = ({icon: Icon, ...rest}) => (
    <Container>
        {/* Caso o icone exista então... */}
        {Icon && <Icon size={20}/>}
        <input {... rest} />

    </Container>
);

export default Input;