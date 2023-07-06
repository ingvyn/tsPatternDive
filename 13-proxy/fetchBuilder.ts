enum HttpMethods {
    GET = "GET",
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

type TypedBody = Blob | ArrayBuffer | DataView | FormData | URLSearchParams | ReadableStream | string;

class FetchingBuilder {
    private url: string;
    private requestOptions: RequestInit = {};

    setUrl(url: URL) {
        this.url = url.href;
        return this;
    }
    
    setMethod(method: HttpMethods) {
        this.requestOptions.method = method;
        return this;
    }

    setHeaders(headers: Headers) {
        this.requestOptions.headers = headers;
        return this;
    }

    setBody(body: TypedBody) {
        this.requestOptions.body = body;
        return this;
    }

    async doFetch() {
        return await fetch(this.url, this.requestOptions);
    }
}

export { HttpMethods, FetchingBuilder };
