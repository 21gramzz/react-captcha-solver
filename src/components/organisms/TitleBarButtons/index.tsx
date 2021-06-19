import React from 'react';
import styled from 'styled-components';
import { CloseWindowButton } from '../../atoms/CloseWindowButton';
import { MinimizeWindowButton } from '../../atoms/MinimizeWindowButton';
import { MaximizeWindowButton } from '../../atoms/MaximizeWindowButton';

const StyledTitleBarButtons = styled.div`
  padding: 10px 10px 10px 10px;
  width: 70px;
  display: flex;
  justify-content: space-between;
`;

const { myAPI } = window;

export const TitleBarButtons: React.FC = () => {
  return (
    <StyledTitleBarButtons>
      <CloseWindowButton onClick={() => myAPI.send('closeWindow')} />
      <MinimizeWindowButton onClick={() => myAPI.send('minimizeWindow')} />
      <MaximizeWindowButton onClick={() => myAPI.send('maximizeWindow')} />
    </StyledTitleBarButtons>
  );
};
