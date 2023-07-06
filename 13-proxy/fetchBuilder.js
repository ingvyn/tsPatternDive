"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchingBuilder = exports.HttpMethods = void 0;
var HttpMethods;
(function (HttpMethods) {
    HttpMethods["GET"] = "GET";
    HttpMethods["POST"] = "POST";
    HttpMethods["PUT"] = "PUT";
    HttpMethods["DELETE"] = "DELETE";
    HttpMethods["PATCH"] = "PATCH";
})(HttpMethods || (HttpMethods = {}));
exports.HttpMethods = HttpMethods;
class FetchingBuilder {
    constructor() {
        this.requestOptions = {};
    }
    setUrl(url) {
        this.url = url.href;
        return this;
    }
    setMethod(method) {
        this.requestOptions.method = method;
        return this;
    }
    setHeaders(headers) {
        this.requestOptions.headers = headers;
        return this;
    }
    setBody(body) {
        this.requestOptions.body = body;
        return this;
    }
    async doFetch() {
        return await fetch(this.url, this.requestOptions);
    }
}
exports.FetchingBuilder = FetchingBuilder;
