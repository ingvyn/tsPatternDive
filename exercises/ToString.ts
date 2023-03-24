function toString<T>(data: T): string | undefined {
    if (Array.isArray(data)) {
        return data.toString();
    }
    switch (typeof data) {
        case 'string':
            return data;
        case 'number':
        case 'boolean':
        case 'function':
            return data.toString();
        case 'object':
            return JSON.stringify(data);
        default:
            return undefined;

    }
}

console.log(toString(4));
const func = () => true;
console.log(toString(func));