"use strict";
const testObj = {
    a: 1,
    b: 2
};
const swapKeysAndValues = (obj) => Object.entries(obj).reduce((acc, [key, value]) => {
    return Object.assign(Object.assign({}, acc), { [value]: key });
}, {});
console.log(swapKeysAndValues(testObj));
