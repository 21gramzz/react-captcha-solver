import React from 'react';
import styled from 'styled-components';
import { IBrowserSession, ICaptchaConfig } from '../../../types';
import { CaptchaSolverForm } from '../../organisms/CaptchaSolverForm';

interface IProps {
  browserSession: IBrowserSession;
  captchaConfig: ICaptchaConfig;
}

const Container = styled.div`
  padding: 3rem;
`;

export const CaptchaSolverTemplate: React.FC<IProps> = props => {
  return (
    <Container>
      <CaptchaSolverForm {...props} />
    </Container>
  );
};
