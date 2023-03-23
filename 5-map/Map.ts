const crc32 = require('crc-32');

type valueType = number | string;

type KVPair = {
    key: string;
    value: valueType;
};

class LItem {
    element: KVPair | null;
    next: LItem | null;
    prev: LItem;
}

class LList {
    private head: LItem;

    constructor() {
        this.head = new LItem();
        this.head.element = null;
        this.head.next = null;
        this.head.prev = this.head;
    }

    public addItem(key: string, value: valueType): void {
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

    public deleteItem(key: string): void {
        const foundItem = this.getItem(key);
        if (foundItem === undefined) {
            throw new Error(`Ключ ${key} не содержится в хранилище`);
        }
        const prevItem = foundItem.prev;
        prevItem.next = foundItem.next;
        if (foundItem.next === null) {
            this.head.prev = prevItem;
        } else {
            foundItem.next.prev = prevItem;
        }
    }

    public getValue(key: string): valueType | undefined {
        return this.getItem(key)?.element?.value;
    }

    private getItem(key: string): LItem | undefined {
        let currItem: LItem | null = this.head.next;
        while (currItem !== null) {
            const { element } = currItem;
            if (element?.key === key) {
                return currItem;
            }
            currItem = currItem.next;
        }
        return undefined;
    }
}

class HashMap {
    private _storage : LList[] = [];

    private static getIndex(key: string): number {
        return Math.abs(crc32.str(key)) % 1000;
    }

    public set(key: string, value: valueType): void {
        const index = HashMap.getIndex(key);
        if (!this._storage[index]) {
            this._storage[index] = new LList();
        }
        this._storage[index].addItem(key, value);
    }

    public get(key: string): valueType {
        const index = HashMap.getIndex(key);
        const value = this._storage[index]?.getValue(key);
        if (!value) {
            throw new Error(`Ключ ${key} не содержится в хранилище`);
        }
        return value;
    }

    public delete(key: string): void {
        const index = HashMap.getIndex(key);
        this._storage[index].deleteItem(key);
    }

    public clear(): void {
        this._storage = [];
    }
}


try {
    const dict = new HashMap();
    dict.set('purple', 'js courses');
    dict.set('purple', 'js node and typescript courses');
    dict.set('homework', 'classes');
    dict.set('willbedeleted', 45);
    dict.delete('willbedeleted');

    console.log(dict.get('homework'));
    console.log(dict.get('purple'));
    console.log(dict.get('willbedeleted'));
} catch (e) {
    console.log((e as Error).message);
}