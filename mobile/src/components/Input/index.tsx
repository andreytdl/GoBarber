import React, { useEffect, useRef } from 'react';
import { Container, TextInput, Icon } from './styles';
import { TextInputProps } from 'react-native'

import { useField } from '@unform/core';

//Isso serve para criar/deixar obrigatório propriedades que serão utilizadas no css
interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest}) => {
    const { registerField, defaultValue = '', fieldName, error } = useField(name);

    const inputValueRef = useRef<InputValueReference>({ value: defaultValue});

    const inputElementRef = useRef<any>(null);

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            //Fazendo a atualização dos valores visualmente
            setValue(ref: any, value){
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({text: value})
            },
            clearValue(){
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            },
        });

    }, [fieldName, registerField])

    return (
    <Container>
        <Icon name={icon} size={20} color="#666360"/>
        <TextInput 
        ref={inputElementRef}
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={(value) => {
            inputValueRef.current.value = value
        }}
        {...rest} />

    </Container>
    );

}

export default Input;