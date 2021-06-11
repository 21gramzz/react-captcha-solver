import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Badge } from '../../atoms/Badge';
import { theme } from '../../../styles/theme';
import { ICaptchaResponse } from '../../../types';

interface IProps {
  captchaToken: ICaptchaResponse;
}

const StyledCaptchaListRow = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.7rem 1.5rem;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.shadow};
  min-width: 30rem;
  &:hover {
    box-shadow: inset 3px 3px 6px ${({ theme }) => theme.shadow},
      inset -3px -3px 6px ${({ theme }) => theme.light};
  }
`;

const Body = styled.div`
  color: ${({ color, theme }) => color || theme.text};
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  font-size: 1.4rem;
  font-weight: 600;
  min-width: 0;
`;

const Expire = styled.div`
  padding: 0.2rem;
`;

const Host = styled.div`
  padding: 0.2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const CaptchaListRow: React.FC<IProps> = ({ captchaToken }) => {
  const [expiryCount, setExpiryCount] = useState<number>(115);
  const expiryCountRef = useRef(expiryCount);

  const expiryMemo = useMemo(() => {
    return new Date((captchaToken.timestamp + 115) * 1000).toLocaleTimeString();
  }, []);

  useEffect(() => {
    expiryCountRef.current = expiryCount;
  }, [expiryCount]);

  useEffect(() => {
    const id = setInterval(() => {
      setExpiryCount(expiryCountRef.current - 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <StyledCaptchaListRow>
      <Body>
        <Host>{captchaToken.host}</Host>
        <Expire>{`Expirs on ${expiryMemo}`}</Expire>
      </Body>
      <Badge
        color={'#fff'}
        backgroundColor={
          expiryCount > 50
            ? theme.success
            : expiryCount > 9
            ? theme.warning
            : theme.danger
        }
      >
        {expiryCount > 0 ? expiryCount : null}
        {expiryCount > 1
          ? ' seconds'
          : expiryCount === 1
          ? ' second'
          : 'Expired'}
      </Badge>
    </StyledCaptchaListRow>
  );
};
