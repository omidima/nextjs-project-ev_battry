import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { API_URL } from './app_constant';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from './storage_key';


interface IApiMethodProps {
    url: string;
    data?: object;
    withToken?: boolean;
    onUploadProgressChange?: (p: any) => void;
    content_type?: string;
}
export default class APIServer {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new APIServer();
        }
        return this.instance;
    }
    private static instance: APIServer;
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
                console.log('error in request : ', error);
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

    public setAuthToken() {
        let _user_token = cookies().get(ACCESS_TOKEN)?.value;
        this.AuthToken = _user_token ?? '';
        this.CreateAxiosInstance(true);
    }
    public handleAuthTokenInHeader(withToken: boolean) {
        if (withToken) {
            this.setAuthToken();
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
    public PostMethod<T>(props: IApiMethodProps): AxiosPromise<T> {
        const { url, data, withToken, onUploadProgressChange, content_type } = props;
        this.handleAuthTokenInHeader(!!withToken);

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
    public GetMethod<T>(props: IApiMethodProps): AxiosPromise<T> {
        const { url, data, withToken } = props;
        this.handleAuthTokenInHeader(!!withToken);
        return this.axiosWrapper<T>({ method: 'GET', url, headers: this.headers, data });
    }
    public PatchMethod<T>(props: IApiMethodProps): AxiosPromise<T> {
        const { url, data, withToken } = props;
        this.handleAuthTokenInHeader(!!withToken);
        return this.axiosWrapper<T>({ method: 'PATCH', url, headers: this.headers, data });
    }
    public PutMethod<T>(props: IApiMethodProps): AxiosPromise<T> {
        const { url, data, withToken } = props;
        this.handleAuthTokenInHeader(!!withToken);
        return this.axiosWrapper<T>({ method: 'PUT', url, headers: this.headers, data });
    }
    public DeleteMethod<T>(props: IApiMethodProps): AxiosPromise<T> {
        const { url, data, withToken } = props;
        this.handleAuthTokenInHeader(!!withToken);
        return this.axiosWrapper<T>({ method: 'DELETE', url, headers: this.headers, data });
    }
}
