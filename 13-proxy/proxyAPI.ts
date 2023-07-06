import { HttpMethods, FetchingBuilder } from "./fetchBuilder.js";
 
class ProductAPI {
  constructor(private requestBuilder: FetchingBuilder, private apiUrl: string) {
  }
 
  async getProduct(id: number) {
      const productsUrl = new URL(this.apiUrl);
      const productUrl = new URL(id.toString(), productsUrl);
      const response = await this.requestBuilder
        .setUrl(productUrl)
        .setMethod(HttpMethods.GET)
        .doFetch();
      return await response.json();  
  }
}
 
class ProxyProductAPI {
  constructor(private productAPIAccess: ProductAPI) {
  }
 
  async getProduct(id: number) {
    if (id >= 10) {
      throw new Error(`Доступ к продуктам с id=${id} ограничен`);
    }
    return await this.productAPIAccess.getProduct(id);
  }
}

const testProxyProductAPI = async (id: number) => {
    try {
        const productAPI = new ProductAPI(new FetchingBuilder(), 'https://dummyjson.com/products/1');
        const proxyProductAPI = new ProxyProductAPI(productAPI);
        console.log(await proxyProductAPI.getProduct(id));
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

testProxyProductAPI(8);
testProxyProductAPI(12);