export interface ICaptchaResponse {
  token: string;
  host: string;
  timestamp: number;
}

export interface IProxy {
  host: string;
  port: number;
  user: string;
  password: string;
}

export interface IBrowserSession {
  id: string;
  proxy: IProxy;
}

export interface ICaptchaConfig {
  host: string;
  siteKey: string;
}
