interface Headers {
    [key: string]: string
}
export interface RequestParams {
    url: string,
    method?: string,
    headers?: Headers
}