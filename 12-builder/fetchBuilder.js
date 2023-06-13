"use strict";
var HttpMethods;
(function (HttpMethods) {
    HttpMethods["GET"] = "GET";
    HttpMethods["POST"] = "POST";
    HttpMethods["PUT"] = "PUT";
    HttpMethods["DELETE"] = "DELETE";
    HttpMethods["PATCH"] = "PATCH";
})(HttpMethods || (HttpMethods = {}));
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
const testFetchingBuilder = async () => {
    try {
        const response = await new FetchingBuilder()
            .setUrl(new URL('https://dummyjson.com/users'))
            .setMethod(HttpMethods.GET)
            .doFetch();
        console.log(await response.json());
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            throw error;
        }
    }
};
testFetchingBuilder();
