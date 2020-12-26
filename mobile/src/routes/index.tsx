import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../hooks/Auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {

    //Buscando o usuário e o loading do nosso contexto
    const { user, loading } = useAuth();

    if(loading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#999"/>
            </View>
        )
    }


    //As rotas que serão usadas caso o usuário esteja logado / Caso não esteja
    return user ? <AppRoutes/> : <AuthRoutes/>
};

export default Routes;