import React, { useEffect, useState } from 'react';
import { CaptchaSolverTemplate } from '../../templates/CaptchaSolverTemplate';
import { IpcRendererEvent } from 'electron';
import { IBrowserSession, ICaptchaConfig } from '../../../types';

const { myAPI } = window;

export const CaptchaSolverPage: React.FC = () => {
  const [browserSession, setBrowserSession] = useState<IBrowserSession>();
  const [captchaConfig, setCaptchaConfig] = useState<ICaptchaConfig>();
  useEffect(() => {
    myAPI.on(
      'loadedCaptchaWindow',
      (
        event: IpcRendererEvent,
        browserSession: IBrowserSession,
        captchaConfig: ICaptchaConfig,
      ) => {
        setBrowserSession(browserSession);
        setCaptchaConfig(captchaConfig);
      },
    );
    return () => {
      myAPI.removeAllListeners('loadedCaptchaWindow');
    };
  }, []);
  return browserSession && captchaConfig ? (
    <CaptchaSolverTemplate
      browserSession={browserSession}
      captchaConfig={captchaConfig}
    />
  ) : null;
};
