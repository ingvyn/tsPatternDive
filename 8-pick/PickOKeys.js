"use strict";
function pickObjectKeys(obj, keyArrs) {
    return keyArrs.reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: obj[key] })), {});
}
const user = {
    name: 'Vasya',
    age: 20,
    skills: ['java', 'android', 'mobile development'],
    hobby: ['travels', 'computer games']
};
console.log(pickObjectKeys(user, ['skills', 'hobby']));
