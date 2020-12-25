import { ValidationError } from 'yup';

// O [key: string]: string significa que teremos um objeto qualquer (name, email ou password por exemplo) que seja uma string
interface Errors {
    [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors{
    const validationErrors: Errors = {}

    err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
    });
    
    return validationErrors;
}