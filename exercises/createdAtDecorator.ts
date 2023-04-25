interface IUserService {
	users: number;
	getUsersInDatabase(): number;
}

@createdAt
class UserService implements IUserService {
	users: number = 1000;

	getUsersInDatabase(): number {
		return this.users;
	}
}

function createdAt<T extends { new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {
        public createdAt: Date = new Date();
    }
}

type CreatedAt = {
    createdAt: Date;
};

console.log((new UserService() as IUserService & CreatedAt).createdAt);