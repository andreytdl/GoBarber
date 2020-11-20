import React, { createContext, useCallback, useContext, useState} from 'react' 
import ToastContainer from '../components/ToastContainer';
import { v4 as uuid } from 'uuid';

interface ToastContextData {
    addToast(): void
    removeToast(): void
}

interface ToastMessage{
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

        setMessages([...messages, toast])
    }, [])

    const removeToast = useCallback(() => {
        console.log("add Toast")
    }, [])

    return(
        <toastContext.Provider value={{ addToast, removeToast}}>
            {children}
            <ToastContainer/>
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