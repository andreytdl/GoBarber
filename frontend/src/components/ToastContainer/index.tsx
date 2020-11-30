import React from 'react';

import Toast from './Toast'

import { ToastMessage } from '../../hooks/Toast'
import { Container } from './styles';
import { useTransition } from 'react-spring';

interface ToastContainerProps {
    messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({messages}) => {    
    //Animation
    const messageWithTransitions = useTransition(
        messages,
        message => message.id,
        {
            //100% é o tamanho dele
            from: {right: '-120%'},
            enter: {right: '0%'},
            leave: {right: '-120%'}
        }
        )

    return (
        <Container>
            {messageWithTransitions.map(({item, key, props}) => (
                <Toast 
                key={key}
                message={item}
                style={props}
                >
            </Toast>
            ))}


        </Container>


    );
}

export default ToastContainer;