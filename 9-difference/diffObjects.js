"use strict";
function diffObjects(fiObj, seObj) {
    return Object.keys(fiObj).filter((key) => !(key in seObj)).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: fiObj[key] })), {});
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
