import React from 'react';
import styled from 'styled-components';
import { CaptchaListRow } from '../../organisms/CaptchaListRow';
import { ICaptchaResponse } from '../../../types';

interface IProps {
  captchaTokens: ICaptchaResponse[];
  margin?: string;
  padding?: string;
}

const StyledCaptchaList = styled.div<Pick<IProps, 'margin' | 'padding'>>`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
`;

const NoCaptchaMessage = styled.div`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
  font-weight: 500;
`;

export const CaptchaList: React.FC<IProps> = props => {
  return (
    <StyledCaptchaList {...props}>
      {props.captchaTokens.length > 0 ? (
        props.captchaTokens.map(captchaToken => (
          <CaptchaListRow
            key={captchaToken.token}
            captchaToken={captchaToken}
          />
        ))
      ) : (
        <NoCaptchaMessage>No captcha tokens available</NoCaptchaMessage>
      )}
    </StyledCaptchaList>
  );
};
