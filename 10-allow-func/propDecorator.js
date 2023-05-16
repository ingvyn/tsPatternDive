"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class User {
    constructor() {
        this.age = 30;
    }
}
__decorate([
    AllowFunc((a) => a > 17)
], User.prototype, "age", void 0);
const person = new User();
function AllowFunc(allow) {
    return (target, propertyKey) => {
        let proxyProperty;
        const setter = (value) => {
            if (allow(value)) {
                proxyProperty = value;
            }
        };
        const getter = () => {
            return proxyProperty;
        };
        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter
        });
    };
}
console.log(person.age);
person.age = 17;
console.log(person.age);
person.age = 22;
console.log(person.age);
