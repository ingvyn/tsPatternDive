"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var GENDER;
(function (GENDER) {
    GENDER["MALE"] = "male";
    GENDER["FEMALE"] = "female";
})(GENDER || (GENDER = {}));
const axios = require('axios');
const logUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get('https://dummyjson.com/users');
        const users = response.data.users;
        const userLogs = users.map((user) => `User ${user.firstName} ${user.lastName} ${user.gender} being live in ${user.address.city} ${user.address.address} and work in ${user.company.name}`);
        console.log(userLogs.join('\n'));
    }
    catch (e) {
        throw Error('dummyjson.com/users doesn\'t response');
    }
});
logUsers();
