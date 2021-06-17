import React from 'react';
import styled from 'styled-components';
import { CloseWinsowButton } from '../../atoms/CloseWindowButton';
import { MinimizeWinsowButton } from '../../atoms/MinimizeWindowButton';
import { MaximizeWinsowButton } from '../../atoms/MaximizeWindowButton';

const StyledTitleBarButtons = styled.div`
  padding: 10px;
  width: 70px;
  display: flex;
  justify-content: space-between;
`;

const { myAPI } = window;

export const TitleBarButtons: React.FC = () => {
  return (
    <StyledTitleBarButtons>
      <CloseWinsowButton onClick={() => myAPI.send('closeWindow')} />
      <MinimizeWinsowButton onClick={() => myAPI.send('minimizeWindow')} />
      <MaximizeWinsowButton onClick={() => myAPI.send('maximizeWindow')} />
    </StyledTitleBarButtons>
  );
};
