interface Headers {
    [key: string]: string
}
type method = "GET" | "POST" | "PATCH";

export interface RequestParams {
    url: string,
    body?: null | string
    method?: method,
    headers?: Headers,
    
}


