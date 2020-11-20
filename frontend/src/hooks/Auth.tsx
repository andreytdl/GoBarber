import React, {createContext, useCallback, useContext, useState} from 'react'

import api from '../services/api';

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

interface AuthState {
    token: string;
    user: object;
}

//as AuthContext forçamos o contexto a iniciar como um objeto vazio
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

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
        
        console.log(response.data);
        
        setData({token, user})
    }, []);

    const signOut = useCallback(() => {
        //Removemos do local storage
        localStorage.removeItem("@GoBarber:token");
        localStorage.removeItem("@GoBarber:user");

        //Removemos da Context Api
        setData({} as AuthState)
    }, [])

    return (
        <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    //Caso algum dev tente usar o metodo useAuth sem existir o contexto antes (Ao redor do App.tsx como está atualmente)
    if(!context) {
        throw Error('UserAuth must be used within an AuthProvides')
    }

    return context
}