interface IForm {
    name: string;
    password: string;
}

const form: IForm = {
    name: 'Вася',
    password: '123'
};

type ValidatorResult = {
    isValid: true,
} | {
    isValid: false,
    errorMessage: string,
};

type ValidatorForm<Type> = {
    [Property in keyof Type]: ValidatorResult;
}

const formValidation: ValidatorForm<IForm> = {
    name: { isValid: true },
    password: { isValid: false, errorMessage: 'Должен быть длиннее 5 символов', },
};