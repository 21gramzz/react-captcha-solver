import { IpcRendererEvent } from 'electron';

declare global {
  interface Window {
    grecaptcha: ICaptcha;
    myAPI: ISandBox;
    onSubmitCaptcha: (token: string | null) => void;
  }
}

interface ISandBox {
  send: (channel: string, ...args: any[]) => void;
  on: (
    channel: string,
    listener: (event: IpcRendererEvent, ...args: any[]) => void,
  ) => void;
  removeListener: (channel: string, listener: (...args: any[]) => void) => void;
  removeAllListeners: (channel: string) => void;
  randomString: () => string;
}

interface ICaptcha {
  execute: () => void;
  reset: () => void;
}
