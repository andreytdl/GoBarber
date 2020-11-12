import React, {createContext, useCallback, useState} from 'react'

import api from '../services/api';

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;

}

interface AuthState {
    token: string;
    user: object;
}

//as AuthContext forçamos o contexto a iniciar como um objeto vazio
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {

    //Não será inicializado com um valor padrão, mas com uma função
    const [data, setData] = useState<AuthState>(() => {

        //Verificando se as variáveis já existem no Local Storage
        const token = localStorage.getItem("@GoBarber:token");
        const user = localStorage.getItem("@GoBarber:user");

        //Caso exista
        if(token && user){
            return { token, user: JSON.parse(user)}
        }

        //Caso não exista
        return {} as AuthState;

    });

    //METODO PARA REALIZAR A AUTENTICAÇÃO DO USUÁRIO
    const signIn = useCallback(async ({email, password}) => {
        

        //Autenticando no servidor backend
        const response = await api.post('session', {
            email,
            password,
        });

        const { token, user } = response.data;

        //Salvando os dados no nosso Local Storage
        localStorage.setItem("@GoBarber:token", token)
        //O user é objeto e portanto precisa do JSON.stringfy
        localStorage.setItem("@GoBarber:user", JSON.stringify(user))
        
        console.log(data);
        
        setData({token, user})
    }, []);

    return (
        <AuthContext.Provider value={{user: data.user, signIn}}>
            {children}
        </AuthContext.Provider>
    );
}