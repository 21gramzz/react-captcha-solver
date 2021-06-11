import React, { useState, useEffect } from 'react';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { IpcRendererEvent } from 'electron';
import { MainTemplate } from '../../templates/MainTemplate';
import { IBrowserSession, ICaptchaResponse } from '../../../types';
import {
  editSession,
  deleteSession,
} from '../../../redux/slices/browserSessions/slice';

const { myAPI } = window;

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { browserSessions } = useSelector(
    (state: RootState) => state.browserSessions,
  );
  const { captchaConfig } = useSelector(
    (state: RootState) => state.captchaConfig,
  );
  const [captchaTokens, setCaptchaTokens] = useState<ICaptchaResponse[]>([]);

  useEffect(() => {
    myAPI.on(
      'editSession',
      (event: IpcRendererEvent, session: IBrowserSession) => {
        dispatch(editSession(session));
      },
    );
    myAPI.on(
      'deleteSession',
      (event: IpcRendererEvent, session: IBrowserSession) => {
        dispatch(deleteSession(session));
      },
    );
    return () => {
      myAPI.removeAllListeners('editSession');
      myAPI.removeAllListeners('deleteSession');
    };
  }, []);

  useEffect(() => {
    myAPI.on(
      'addCaptcha',
      (event: IpcRendererEvent, captcha: ICaptchaResponse) => {
        setCaptchaTokens([...captchaTokens, captcha]);
      },
    );
    myAPI.on(
      'deleteCaptcha',
      (event: IpcRendererEvent, captcha: ICaptchaResponse) => {
        const newCaptchaList = captchaTokens.filter(
          c => c.token !== captcha.token,
        );
        setCaptchaTokens(newCaptchaList);
      },
    );
    return () => {
      myAPI.removeAllListeners('addCaptcha');
      myAPI.removeAllListeners('deleteCaptcha');
    };
  }, [captchaTokens]);

  return (
    <MainTemplate
      captchaTokens={captchaTokens}
      browserSessions={browserSessions}
      captchaConfig={captchaConfig}
    />
  );
};
