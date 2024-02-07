import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { API_URL } from './app_constant';
import { getCookie } from './cookie_helper';
import { ACCESS_TOKEN } from './storage_key';


interface IApiMethodProps {
    url: string;
    data?: object;
    withToken?: boolean;
    onUploadProgressChange?: (p: any) => void;
    content_type?: string;
}
export default class API {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new API();
        }
        return this.instance;
    }
    private static instance: API;
    private baseURL: string = API_URL;
    private AuthToken!: string | null;
    private axios: AxiosInstance | undefined;
    private headers!: {
        Authorization?: string;
        'Content-Type'?: string;
        Accept?: string;
    };
    private constructor() {
        this.InitialToken();
        this.CreateAxiosInstance(false);
    }
    public CreateAxiosInstance(withToken: boolean) {
        this.axios = axios.create({
            timeout: 5000,
            maxRedirects: 5,
            headers: this.getHeaders(withToken),
        });
        this.axios.interceptors.request.use(
            function (config) {
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
        this.axios.interceptors.response.use(
            function (config) {
                return config;
            },
            function (error) {
                return Promise.reject(error.response || error);
            }
        );
    }
    public InitialToken() {
        let userToken = null;
        if (userToken) {
            this.AuthToken = userToken;
        } else this.AuthToken = null;
    }

    public destroy() {
        this.AuthToken = null;
    }

    public async setAuthToken() {
        let _user_token;
        if (typeof window === "undefined") {
            const module = await import('next/headers')
            _user_token = module.cookies().get(ACCESS_TOKEN)?.value;
        } else {
            _user_token = getCookie(ACCESS_TOKEN);
        }
        this.AuthToken = _user_token ?? '';
        this.CreateAxiosInstance(true);
    }
    public async handleAuthTokenInHeader(withToken: boolean) {
        if (withToken) {
            await this.setAuthToken();
        } else {
            this.CreateAxiosInstance(false);
        }
    }
    public getHeaders(withToken: boolean = false): any {
        this.headers = {};
        if (this.AuthToken && withToken) {
            this.headers.Authorization = `Bearer ${this.AuthToken}`.replaceAll('"', '');
        }
        return this.headers;
    }

    public axiosWrapper<T>(axiosArgument: any): AxiosPromise<T> {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            this.axios(axiosArgument)
                .then(response => {
                    resolve(response);
                })
                .catch(error => reject(error));
        });
    }
    public async PostMethod<T>(props: IApiMethodProps): Promise<AxiosPromise<T>> {
        const { url, data, withToken, onUploadProgressChange, content_type } = props;
        await this.handleAuthTokenInHeader(!!withToken);

        let options: {
            headers: any;
        } = {
            headers: props.content_type
                ? { ...this.headers, 'Content-Type': props.content_type }
                : this.headers,
        };

        return this.axiosWrapper<T>({
            method: 'POST',
            url,
            headers: this.headers,
            data,
            config: options,
            onUploadProgress: (progressEvent: any) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onUploadProgressChange?.(percentCompleted);
            },
        });
    }
    public async GetMethod<T>(props: IApiMethodProps): Promise<AxiosPromise<T>> {
        const { url, data, withToken } = props;
        await this.handleAuthTokenInHeader(!!withToken);
        return this.axiosWrapper<T>({ method: 'GET', url, headers: this.headers, data });
    }
    public async PatchMethod<T>(props: IApiMethodProps): Promise<AxiosPromise<T>> {
        const { url, data, withToken } = props;
        await this.handleAuthTokenInHeader(!!withToken);
        return this.axiosWrapper<T>({ method: 'PATCH', url, headers: this.headers, data });
    }
    public async PutMethod<T>(props: IApiMethodProps): Promise<AxiosPromise<T>> {
        const { url, data, withToken } = props;
        await this.handleAuthTokenInHeader(!!withToken);
        return this.axiosWrapper<T>({ method: 'PUT', url, headers: this.headers, data });
    }
    public async DeleteMethod<T>(props: IApiMethodProps): Promise<AxiosPromise<T>> {
        const { url, data, withToken } = props;
        await this.handleAuthTokenInHeader(!!withToken);
        return this.axiosWrapper<T>({ method: 'DELETE', url, headers: this.headers, data });
    }
}
