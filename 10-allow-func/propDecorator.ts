class User {
    @AllowFunc((a: number): boolean => a > 17)
    age: number = 30;
}

const person = new User();


function AllowFunc(allow: (arg: any) => boolean) {
    return (
        target: Object,
        propertyKey: string
    ) => {
        let proxyProperty: number;
        const setter = (value: any) => {
            if(allow(value)) {
                proxyProperty = value;
            }
        }

        const getter = () => {
            return proxyProperty;
        }

        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter
        });
    }
}

console.log(person.age);

person.age = 17;
console.log(person.age);

person.age = 22;
console.log(person.age);