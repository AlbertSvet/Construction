interface Headers {
    [key: string]: string
}
type method = "GET" | "POST" | "PATCH";
export interface getDataParams {
    url: string,
    method?: method,
    headers?: Headers,
}
