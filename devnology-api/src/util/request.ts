/* eslint-disable @typescript-eslint/no-empty-interface */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
export interface RequestConfig extends AxiosRequestConfig {}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Response<T = any> extends AxiosResponse<T> {}

export class Request {
    constructor(private request = axios) {}

    public static isReqError(error: AxiosError): boolean {
        // We must return
        // true: if we reach the server and get a sucess full return
        // false: no reach at external API
        return !!(error.response && error.response.status);
        // TODO
        // we must test a family friend syntaxing
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getCarsFromExternalService<T = any>(
        url: string,
        config: RequestConfig = {}
    ): Promise<Response<T>> {
        // perfom a request to external service
        // It must recive a string with PLATE - placa - and reach api
        return this.request.get<T, Response<T>>(url, config);
    }
}
