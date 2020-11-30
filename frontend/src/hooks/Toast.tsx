import React, { createContext, useCallback, useContext, useState} from 'react' 
import ToastContainer from '../components/ToastContainer';
import { v4 as uuid } from 'uuid';

interface ToastContextData {
    addToast(message: Omit<ToastMessage, 'id'>): void
    removeToast(id: string): void
}

export interface ToastMessage{
    id: string;
    type?: 'success' | 'error' | 'info';
    title: string;
    description?: string
}

const toastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC =({children}) => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
        const id = uuid();

        const toast = {
            id,
            type,
            title,
            description
        };

        //Caso estejamos passando por função receberemos o valor antigo (oldMessages)
        setMessages((oldMessages) => [...oldMessages, toast])
    }, [])

    const removeToast = useCallback((id: string) => {
        
        //Recebendo as mensagens antigas do estado como uma function (state)
        setMessages(state => state.filter(message => message.id != id))


    }, [])

    return(
        <toastContext.Provider value={{ addToast, removeToast}}>
            {children}
            <ToastContainer messages={messages}/>
        </toastContext.Provider>
    );
}

function useToast(): ToastContextData{
    const context = useContext(toastContext)

    if(!context){
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;

}

export { ToastProvider, useToast}