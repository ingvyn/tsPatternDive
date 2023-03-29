interface IData {
    group: number;
    name: string;
}

const dataGroup: IData[] = [
	{ group: 1, name: 'a' },
	{ group: 1, name: 'b' },
	{ group: 2, name: 'c' },
];

type KV = string | number;
type J = Record<KV, KV>[];
function groupByKey<T extends Record<KV, KV>, K extends keyof T>(data: T[], key: K): Record<KV, J> {
    return data.reduce((acc, object) => {
        const targetKeyArrray: J = ((object[key] as KV) in acc) ? acc[object[key] as KV]: [];
        return {...acc, [object[key] as KV]: targetKeyArrray.push(object)};
    }, {});
}