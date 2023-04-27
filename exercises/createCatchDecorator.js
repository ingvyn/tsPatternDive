"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class UsersPick {
    constructor() {
        this.users = 1000;
    }
    getUsersInDatabase() {
        throw new Error('Произошла ошибка при вызове функции');
    }
}
__decorate([
    Catch()
], UsersPick.prototype, "getUsersInDatabase", null);
function Catch(rethrow = false) {
    return (target, _, descriptor) => {
        const method = descriptor.value;
        descriptor.value = (...args) => {
            try {
                return method === null || method === void 0 ? void 0 : method.apply(target, args);
            }
            catch (error) {
                console.log(error.message);
                if (rethrow) {
                    throw error;
                }
            }
        };
    };
}
(new UsersPick()).getUsersInDatabase();