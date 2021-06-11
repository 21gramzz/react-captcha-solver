import React, { ReactNode } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { Icon } from '../../atoms/Icon';

interface IProps {
  content: ReactNode;
  onClose: () => void;
}

const Background = styled.div`
  z-index: 99;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(225, 230, 234, 0.9);
`;

const Container = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: column;
  border-radius: 0.95rem;
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.main};
  box-shadow: 4px 3px 9px ${({ theme }) => theme.shadow},
    -4px -3px 9px ${({ theme }) => theme.light};
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

const modalRoot = document.getElementById('modal-root');

export const Modal: React.FC<IProps> = ({ content, onClose }) => {
  return modalRoot
    ? ReactDOM.createPortal(
        <Background>
          <Container>
            <Header>
              <Icon
                icon="times"
                size="1x"
                fixedWidth
                onClick={() => onClose()}
              />
            </Header>
            {content}
          </Container>
        </Background>,
        modalRoot,
      )
    : null;
};
