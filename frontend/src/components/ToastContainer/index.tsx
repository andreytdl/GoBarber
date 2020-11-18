import React from 'react';

import { Container, Toast } from './styles';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'

const ToastContainer: React.FC = () => {
    return (
        <Container>
            <Toast type="info">
                <FiAlertCircle />


                <div>
                    <strong>Aconteceu um erro</strong>
                    <p>Não foi possível fazer login na aplicação</p>
                </div>

                <button type="button">
                    <FiXCircle size={18} />
                </button>

            </Toast>

            <Toast type="error">
                <FiAlertCircle />


                <div>
                    <strong>Aconteceu um erro</strong>
                    <p>Não foi possível fazer login na aplicação</p>
                </div>

                <button type="button">
                    <FiXCircle size={18} />
                </button>

            </Toast>

            <Toast type="success">
                <FiAlertCircle />


                <div>
                    <strong>Aconteceu um erro</strong>
                    <p>Não foi possível fazer login na aplicação</p>
                </div>

                <button type="button">
                    <FiXCircle size={18} />
                </button>

            </Toast>
        </Container>


    );
}

export default ToastContainer;