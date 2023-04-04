const testObj: Record<string, number> = {
    a: 1,
    b: 2
}

const swapKeysAndValues = (obj: Record<string, number>): Record<number, string> => 
    Object.entries(obj).reduce((acc, [key, value]) => {
        return {...acc, [value]: key}
    }, {});

console.log(swapKeysAndValues(testObj));