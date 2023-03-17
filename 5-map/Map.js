"use strict";
const crc32 = require('crc-32');
// interface IItem {
//     element: KVPair | null;
//     next: IItem | null;
//     prev: IItem | null;
// }
class LItem {
}
class LList {
    constructor() {
        this.head = new LItem();
        this.head.element = null;
        this.head.next = null;
        this.head.prev = this.head;
    }
    addItem(key, value) {
        const foundItem = this.getItem(key);
        if (foundItem) {
            foundItem.element = { key, value };
            return;
        }
        const nextItem = new LItem();
        nextItem.element = { key, value };
        nextItem.next = null;
        const prevItem = this.head.prev;
        nextItem.prev = prevItem;
        prevItem.next = nextItem;
        this.head.prev = nextItem;
    }
    deleteItem(key) {
        const foundItem = this.getItem(key);
        if (foundItem === undefined) {
            throw new Error(`Ключ ${key} не содержится в хранилище`);
        }
        const prevItem = foundItem.prev;
        prevItem.next = foundItem.next;
        if (foundItem.next === null) {
            this.head.prev = prevItem;
        }
        else {
            foundItem.next.prev = prevItem;
        }
    }
    getValue(key) {
        var _a, _b;
        return (_b = (_a = this.getItem(key)) === null || _a === void 0 ? void 0 : _a.element) === null || _b === void 0 ? void 0 : _b.value;
    }
    getItem(key) {
        let currItem = this.head.next;
        while (currItem !== null) {
            const { element } = currItem;
            if ((element === null || element === void 0 ? void 0 : element.key) === key) {
                return currItem;
            }
            currItem = currItem.next;
        }
        return undefined;
    }
}
class HashMap {
    constructor() {
        this._storage = [];
    }
    static getIndex(key) {
        return Math.abs(crc32.str(key)) % 1000;
    }
    set(key, value) {
        const index = HashMap.getIndex(key);
        if (!this._storage[index]) {
            this._storage[index] = new LList();
        }
        this._storage[index].addItem(key, value);
    }
    get(key) {
        var _a;
        const index = HashMap.getIndex(key);
        const value = (_a = this._storage[index]) === null || _a === void 0 ? void 0 : _a.getValue(key);
        if (!value) {
            throw new Error(`Ключ ${key} не содержится в хранилище`);
        }
        return value;
    }
    delete(key) {
        const index = HashMap.getIndex(key);
        this._storage[index].deleteItem(key);
    }
    clear() {
        this._storage = [];
    }
}
const dict = new HashMap();
dict.set('purple', 'js courses');
dict.set('purple', 'js node and typescript courses');
dict.set('homework', 'classes');
console.log(dict.get('homework'));
console.log(dict.get('purple'));
