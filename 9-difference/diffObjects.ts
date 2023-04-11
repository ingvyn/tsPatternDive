interface ICommon {
    [key: string]: any;
}

function diffObjects(fiObj: ICommon,seObj: ICommon): Omit<typeof fiObj, keyof typeof seObj> {
    return Object.keys(fiObj).filter((key) => !(key in seObj)).reduce((acc, key) => ({ ...acc, [key]: fiObj[key] }), {});
}


const programmingCoursesPurple = {
    frontend: ['js-base', 'js-advanced', 'React'],
    backend: ['Node.js', 'Nest.js'],
    devops: ['docker']
};

const programmingCoursesGB = {
    frontend: ['js-base', 'js-advanced', 'React', 'Angular'],
    backend: ['Node.js'],
};

console.log(diffObjects(programmingCoursesPurple, programmingCoursesGB));