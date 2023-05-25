declare module 'sort-by' {
    export default function sortBy<T>(...args: string[]): (obj1: T, obj2: T) => number;
}