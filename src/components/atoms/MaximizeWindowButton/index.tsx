import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  className?: string;
  onClick?: () => void;
}

const Button = styled.div`
  -webkit-app-region: no-drag;
  background-color: #34c749;
  padding: 0;
  margin: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover svg {
    visibility: visible;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 8px;
  visibility: hidden;
  color: black;
  opacity: 0.4;
`;

export const MaximizeWindowButton: React.FC<IProps> = props => {
  return (
    <Button {...props}>
      <Icon icon="plus" fixedWidth />
    </Button>
  );
};
