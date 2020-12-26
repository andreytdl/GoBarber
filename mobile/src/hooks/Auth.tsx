import React, {createContext, useCallback, useContext, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api';

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    loading: boolean;
}

interface AuthState {
    token: string;
    user: object;
}

//as AuthContext forçamos o contexto a iniciar como um objeto vazio
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {

    //Não será inicializado com um valor padrão, mas com uma função
    const [data, setData] = useState<AuthState>({} as AuthState);

    //Verifica se já carregou as informações de auth para que possamos disponibilizar a tela só depois de pronto
    //Caso contrário o usuário irá ser direcionado para o SignIn e só dps da verificação (Assincrona devido ao async storage)
    //é que ele irá para o dashboard ou vice versa
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData(): Promise<void>{

            //Verificando se as variáveis já existem no Local Storage
            const token = await AsyncStorage.getItem("@GoBarber:token");
            const user = await AsyncStorage.getItem("@GoBarber:user");
    
            //Caso exista
            if(token && user){
                setData({token, user: JSON.parse(user)})
            }

            setLoading(false)
        }

        loadStorageData()
    }, [])

    //METODO PARA REALIZAR A AUTENTICAÇÃO DO USUÁRIO
    const signIn = useCallback(async ({email, password}) => {
        

        //Autenticando no servidor backend
        const response = await api.post('session', {
            email,
            password,
        });

        const { token, user } = response.data;

        //Salvando os dados no nosso Local Storage
        await AsyncStorage.setItem("@GoBarber:token", token)
        //O user é objeto e portanto precisa do JSON.stringfy
        await AsyncStorage.setItem("@GoBarber:user", JSON.stringify(user))
        
        console.log(response.data);
        
        setData({token, user})
    }, []);

    const signOut = useCallback(async () => {
        //Removemos do local storage
        await AsyncStorage.removeItem("@GoBarber:token");
        await AsyncStorage.removeItem("@GoBarber:user");

        //Removemos da Context Api
        setData({} as AuthState)
    }, [])

    return (
        <AuthContext.Provider value={{user: data.user, signIn, signOut, loading}}>
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