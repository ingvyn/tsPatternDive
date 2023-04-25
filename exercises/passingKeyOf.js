"use strict";
const dataGroup = [
    { group: 1, name: 'a' },
    { group: 1, name: 'b' },
    { group: 2, name: 'c' },
];
function groupByKey(data, key) {
    return data.reduce((acc, object) => {
        const keyValue = object[key];
        const targetKeyArrray = (keyValue in acc) ? acc[keyValue] : [];
        return Object.assign(Object.assign({}, acc), { [keyValue]: targetKeyArrray.push(object) });
    }, {});
}
