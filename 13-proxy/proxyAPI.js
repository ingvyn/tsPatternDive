"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchBuilder_js_1 = require("./fetchBuilder.js");
class ProductAPI {
    constructor(requestBuilder, apiUrl) {
        this.requestBuilder = requestBuilder;
        this.apiUrl = apiUrl;
    }
    async getProduct(id) {
        const productsUrl = new URL(this.apiUrl);
        const productUrl = new URL(id.toString(), productsUrl);
        const response = await this.requestBuilder
            .setUrl(productUrl)
            .setMethod(fetchBuilder_js_1.HttpMethods.GET)
            .doFetch();
        return await response.json();
    }
}
class ProxyProductAPI {
    constructor(productAPIAccess) {
        this.productAPIAccess = productAPIAccess;
    }
    async getProduct(id) {
        if (id >= 10) {
            throw new Error(`Доступ к продуктам с id=${id} ограничен`);
        }
        return await this.productAPIAccess.getProduct(id);
    }
}
const testProxyProductAPI = async (id) => {
    try {
        const productAPI = new ProductAPI(new fetchBuilder_js_1.FetchingBuilder(), 'https://dummyjson.com/products/1');
        const proxyProductAPI = new ProxyProductAPI(productAPI);
        console.log(await proxyProductAPI.getProduct(id));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
testProxyProductAPI(8);
testProxyProductAPI(12);
