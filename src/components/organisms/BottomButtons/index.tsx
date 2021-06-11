import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { createSession } from '../../../redux/slices/browserSessions/slice';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { SettingsForm } from '../SettingsForm';
import { useModal } from '../../../hooks/useModal';
import { IBrowserSession, ICaptchaConfig } from '../../../types';

interface IProps {
  browserSessions: IBrowserSession[];
  captchaConfig: ICaptchaConfig;
}

const StyledBottomButtons = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 2.5rem;
`;

const { myAPI } = window;

export const BottomButtons: React.FC<IProps> = ({
  browserSessions,
  captchaConfig,
}) => {
  const dispatch = useDispatch();
  const { openModal, closeModal } = useModal();

  const createNewSession = () => {
    const newSession: IBrowserSession = {
      id: myAPI.randomString(),
      proxy: {
        host: '',
        port: 3128,
        user: '',
        password: '',
      },
    };
    dispatch(createSession(newSession));
    myAPI.send('openCaptchaWindow', newSession, captchaConfig);
  };

  return (
    <StyledBottomButtons>
      <Button
        onClick={() => {
          myAPI.send('openAllCaptchaWindows', browserSessions, captchaConfig);
        }}
      >
        <Icon icon={['fab', 'google']} fixedWidth margin="0 0.6rem 0 0" />
        Open Solver
      </Button>
      <Button
        onClick={() => {
          createNewSession();
        }}
      >
        <Icon icon="plus" fixedWidth margin="0 0.6rem 0 0" />
        Create Session
      </Button>
      <Button
        onClick={() => {
          openModal(
            <SettingsForm onClose={closeModal} captchaConfig={captchaConfig} />,
          );
        }}
      >
        <Icon icon="cog" fixedWidth margin="0 0.6rem 0 0" />
        Settings
      </Button>
    </StyledBottomButtons>
  );
};
