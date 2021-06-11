import React from 'react';
import styled from 'styled-components';
import { Heading1 } from '../../atoms/Heading';
import { CaptchaList } from '../../organisms/CaptchaList';
import { TitleBar } from '../../organisms/TitleBar';
import { BottomButtons } from '../../organisms/BottomButtons';
import {
  IBrowserSession,
  ICaptchaConfig,
  ICaptchaResponse,
} from '../../../types';

interface IProps {
  captchaTokens: ICaptchaResponse[];
  browserSessions: IBrowserSession[];
  captchaConfig: ICaptchaConfig;
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  height: 100%;
  min-height: 0px;
  display: flex;
  flex-direction: column;
`;

export const MainTemplate: React.FC<IProps> = props => {
  return (
    <Container>
      <TitleBar />
      <Section>
        <Heading1 margin="0 0 2rem 3rem">
          Captcha Tokens ({props.captchaTokens.length})
        </Heading1>
        <CaptchaList padding="0 2rem" captchaTokens={props.captchaTokens} />
        <BottomButtons {...props} />
      </Section>
    </Container>
  );
};
