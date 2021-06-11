import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCaptchaV2 } from '../../../hooks/useCaptchaV2';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { InputField } from '../../atoms/InputField';
import { IBrowserSession, ICaptchaConfig, IProxy } from '../../../types';

interface IProps {
  browserSession: IBrowserSession;
  captchaConfig: ICaptchaConfig;
}

interface IFormData {
  proxyData: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const { myAPI } = window;

export const CaptchaSolverForm: React.FC<IProps> = ({
  browserSession: session,
  captchaConfig,
}) => {
  const { register, handleSubmit, errors } = useForm<IFormData>();
  const [proxyData, setProxyData] = useState<string>('');
  const { executeCaptcha, CaptchaBadge } = useCaptchaV2(captchaConfig.siteKey);

  useEffect(() => {
    const { host, port, user, password } = session.proxy;
    let proxyDataValue = '';
    if (host !== '' && !isNaN(port)) {
      proxyDataValue = `${host}:${port}`;
      if (user !== '' && password !== '') {
        proxyDataValue = `${proxyDataValue}:${user}:${password}`;
      }
    }
    setProxyData(proxyDataValue);
  }, [session]);

  const solveCaptcha = useCallback(async () => {
    try {
      const token = await executeCaptcha();
      myAPI.send('solveCaptcha', token, captchaConfig.host);
    } catch (err) {
      console.log(err);
    }
  }, [executeCaptcha, CaptchaBadge]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProxyData(event.target.value);
  };

  const handleOnSubmit = (data: IFormData) => {
    let newProxyData: IProxy = {
      host: '',
      port: 3128,
      user: '',
      password: '',
    };
    if (data.proxyData !== '') {
      const host = data.proxyData.split(':');
      newProxyData = {
        host: host[0] || '',
        port: Number(host[1]) || 3128,
        user: host[2] || '',
        password: host[3] || '',
      };
    }
    myAPI.send(`saveProxy:${session.id}`, {
      ...session,
      proxy: newProxyData,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Container>
        <Button type="button" margin="1rem 0" onClick={solveCaptcha}>
          <Icon icon={['fab', 'google']} fixedWidth margin="0 0.6rem 0 0" />
          Solve Capthca
        </Button>
        <Button
          type="button"
          margin="1rem 0"
          onClick={() => myAPI.send('openBrowserWindow', session.id)}
        >
          <Icon icon={['fab', 'chrome']} fixedWidth margin="0 0.6rem 0 0" />
          Open Browser
        </Button>
        <Button
          type="button"
          margin="1rem 0"
          onClick={() => myAPI.send('deleteSession:' + session.id)}
        >
          <Icon icon="trash-alt" fixedWidth margin="0 0.6rem 0 0" />
          Delete Session
        </Button>
        <Button
          margin="1rem 0"
          type="button"
          onClick={() => myAPI.send('forceReloadCaptcha:' + session.id)}
        >
          <Icon icon="sync-alt" fixedWidth margin="0 0.6rem 0 0" />
          Force Reload
        </Button>
        <Button margin="1rem 0" type="submit">
          <Icon icon="project-diagram" fixedWidth margin="0 0.6rem 0 0" />
          Save Proxy
        </Button>
        <InputField
          className={errors.proxyData ? 'is-invalid' : ''}
          name="proxyData"
          placeholder="host:port:user:password"
          margin="1rem 0"
          onChange={handleChange}
          defaultValue={proxyData}
          inputRef={register({
            required: false,
            pattern: /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]):[0-9]{1,6}(:[a-zA-Z0-9]{1,}:[a-zA-Z0-9]{1,})?$/,
          })}
        />
      </Container>
      {CaptchaBadge}
    </form>
  );
};
