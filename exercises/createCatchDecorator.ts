interface IUserService {
	users: number;
	getUsersInDatabase(): number;
}

class UsersPick implements IUserService {
	users: number = 1000;

    @Catch()
	getUsersInDatabase(): number {
		throw new Error('Произошла ошибка при вызове функции');
	}
}


function Catch(rethrow: boolean = false){
    return (
    target: Object,
    _: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ): TypedPropertyDescriptor<(...args: any[]) => any> | void => { 
        const method = descriptor.value;
        descriptor.value = (...args: any[]) => {
            try {
                return method?.apply(target, args);
            } catch(error) {
                console.log((error as Error).message);
                if (rethrow) {
                    throw error;
                }
            }
        }
    }
}

(new UsersPick()).getUsersInDatabase();