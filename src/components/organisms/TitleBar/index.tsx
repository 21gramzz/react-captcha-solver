import React from 'react';
import styled from 'styled-components';
import { TitleBarButtons } from '../TitleBarButtons';

const StyledTitleBar = styled.div`
  -webkit-app-region: drag;
  height: 50px;
`;

export const TitleBar: React.FC = () => {
  return (
    <StyledTitleBar>
      <TitleBarButtons />
    </StyledTitleBar>
  );
};
