const crc32 = require('crc-32');

type KVPair = {
    key: string;
    value: number;
};

// interface IItem {
//     element: KVPair | null;
//     next: IItem | null;
//     prev: IItem | null;
// }

class LItem {
    element: KVPair | null;
    next: LItem | null;
    prev: LItem;
    constructor(pair: KVPair) {
        this.element = pair;
    }
}

class LList {
    private head: LItem;

    constructor() {
        this.head.element = null;
        this.head.next = null;
        this.head.prev = this.head;
    }

    public addItem(key: string, value: number): void {
        const foundItem = this.getItem(key);
        if (foundItem) {
            foundItem.element = { key, value };
            return;
        }
        const nextItem = new LItem({ key, value });
        nextItem.next = null;
        const prevItem = this.head.prev;
        nextItem.prev = prevItem;
        prevItem.next = nextItem;
        this.head.prev = nextItem;
    }

    public deleteItem(key: string): void {
        const foundItem = this.getItem(key);
        if (foundItem === undefined) {
            throw new Error(`Ключ ${key} не задан`);
        }
        const prevItem = foundItem.prev;
        prevItem.next = foundItem.next;
        if (foundItem.next === null) {
            this.head.prev = prevItem;
        } else {
            foundItem.next.prev = prevItem;
        }
    }

    public getValue(key: string): number | undefined {
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

class hashMap {
    private _storage : LList[] = [];

    private getIndex(key: string): number {
        return Math.abs(crc32.str(key)) % 1000;
    }

    public set(key: string, value: number): void {
        const index = this.getIndex(key);
        if (!this._storage[index]) {
            this._storage[index] = new LList(key, value);
            return;
        }
        this._storage[index].addValue(key, value);
    }
}