import React from 'react';
import styled from 'styled-components';

interface IProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  color?: string;
  width?: string;
  margin?: string;
  padding?: string;
  onClick?: () => void;
}

const StyledButton = styled.button<
  Pick<IProps, 'margin' | 'padding' | 'color' | 'width'>
>`
  user-select: none;
  color: ${({ color, theme }) => color || theme.text};
  background-color: ${({ theme }) => theme.main};
  width: ${({ width }) => width || 'auto'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '1rem 2rem'};
  box-shadow: 4px 3px 9px ${({ theme }) => theme.shadow},
    -4px -3px 9px ${({ theme }) => theme.light};
  box-sizing: border-box;
  outline: 0;
  border: 0;
  font-weight: 600;
  font-size: 1.3rem;
  letter-spacing: 0.025em;
  border-radius: 3rem;
  text-align: center;
  &:hover {
    transform: translate(-1px, -1px);
  }
  &:active {
    box-shadow: inset 3px 3px 6px ${({ theme }) => theme.shadow},
      inset -3px -3px 6px ${({ theme }) => theme.light};
  }
`;

export const Button: React.FC<IProps> = props => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
