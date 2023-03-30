interface IData {
    group: number;
    name: string;
}

const dataGroup: IData[] = [
	{ group: 1, name: 'a' },
	{ group: 1, name: 'b' },
	{ group: 2, name: 'c' },
];

type key = string | number | symbol;
type J = Record<key, any>[];
function groupByKey<T extends Record<key, any>, K extends keyof T>(data: T[], key: K): Record<string, J> {
    return data.reduce<Record<string, J>>((acc, object) => {
        const keyValue = object[key];
        const targetKeyArrray: J = (keyValue in acc) ? acc[keyValue] : [];
        return {...acc, [keyValue]: targetKeyArrray.push(object)};
    }, {});
}