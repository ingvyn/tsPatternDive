const crc32 = require('crc-32');

type KVPair = {
    key: string;
    value: number;
};

interface IItem {
    pair: KVPair;
    next: IItem | null;
}

class LList {
    private head: IItem;

    private getTail(): IItem {
        let currItem = this.head;
        while (currItem.next !== null) {
            currItem = currItem.next;
        }
        return currItem;
    }

    public addItem(key: string, value: number): void {
        if (this.getItem(key) === undefined) {
            throw new Error(`Ключ ${key} уже использован`);
        }
        const tail = this.getTail();
        tail.pair = { key, value };
        tail.next = null;
    }

    public deleteItem(key: string): void {
        if (this.getItem(key) === undefined) {
            throw new Error(`Ключ ${key} не задан`);
        }
        const foundItem = this.getItem(key);
    }

    private getItem(key: string): IItem| undefined {
        let currItem: IItem | null = this.head;
        do {
            const { pair } = currItem;
            if (pair.key === key) {
                return currItem;
            }
            currItem = currItem.next;
        } while (currItem !== null);
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