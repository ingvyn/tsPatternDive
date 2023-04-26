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
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ): TypedPropertyDescriptor<(...args: any[]) => any> | void => { 
        const oldValue = descriptor.value;
        descriptor.value = () => {
            if (oldValue !== undefined) {
                try {
                    oldValue();
                } catch(error) {
                    console.log((error as Error).message);
                    if (rethrow) {
                        throw error;
                    }
                }
            }
        }
    }
}

(new UsersPick()).getUsersInDatabase();