import React from 'react';
import { RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/Auth';

interface RouteProps extends ReactDOMRouteProps{
    isPrivate?: boolean;
    component: React.ComponentType;
}


//Componente criado para validar se o usuário está autenticado para acessar alguma rota ou não
const Route: React.FC<RouteProps> = ({isPrivate = false, component: Component, ...rest}) => {
    const { user } = useAuth();

    return (
        <ReactDOMRoute
        { ...rest} 
        render={({location}) => {
            return isPrivate === !!user ? (
                <Component />
            ) : (
                //From location serve para conseguirmos manter o historico de rotas (E ir e voltar por elas pelas setas de cima do navegador)
                <Redirect to ={{ pathname: isPrivate ? '/' : '/dashboard',
                state: { from: location },
            }}/>
            )
        }}
        />
    )
};

export default Route;