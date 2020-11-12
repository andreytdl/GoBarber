import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';
import { useField } from '@unform/core'

import ToolTip from '../Tooltip';

//Tipando o input para que ele possa receber propriedades como placeholder, type, etc
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

//Repare que a tipagem é passada aqui também | e as propriedades são pegas
//icon é renomeado para Icon para que o react o entenda como componente
const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest}) => {
    
    //Estamos referenciando um elemento do tipo input
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    //Unform 
    const { fieldName, defaultValue, error, registerField } = useField(name);

    //Iremos verificar se algo está escrito para que possamos deixar o icone colorido mesmo após o desfoque
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        if(inputRef.current?.value){
            setIsFilled(true);
        }else{
            setIsFilled(false);
        }


    }, [])


    //Ativa o focus do componente
    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, [])


    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        })
    }, [fieldName, registerField])

    return (

    // Para o isFocused editaremos o codigo no css 
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
        {/* Caso o icone exista então... */}
        {Icon && <Icon size={20}/>}
        <input 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef} {... rest} />

        {/* Mostrando o Error embaixo do input */}
        {error && 
        <Error title={error}>
            <FiAlertCircle color="#C53030" size={20}/>    
         </Error>}
    </Container>

    )
}


export default Input;