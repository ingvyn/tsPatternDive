function pickObjectKeys<T extends Record<string, any>, K extends keyof T>(obj: T, keyArrs: K[]): Record<K, any> {
    return keyArrs.reduce((acc, key) => ({...acc, [key]: obj[key] }), {} as Record<K, any>);
}


const user = {
    name: 'Vasya',
    age: 20,
    skills: ['java', 'android', 'mobile development'],
    hobby: ['travels', 'computer games']
};

console.log(pickObjectKeys(user, ['skills', 'hobby']));