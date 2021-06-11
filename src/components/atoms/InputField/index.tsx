import React from 'react';
import styled from 'styled-components';

interface IProps {
  className?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  color?: string;
  width?: string | number;
  margin?: string;
  padding?: string;
  value?: string | number;
  defaultValue?: string | number;
  inputRef?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInputField = styled.input<
  Pick<IProps, 'margin' | 'padding' | 'color' | 'width'>
>`
  color: ${({ color, theme }) => color || theme.text};
  width: ${({ width }) => width || 'auto'};
  margin: ${({ margin }) => margin || '0'};
  background-color: ${({ theme }) => theme.main};
  padding: ${({ padding }) => padding || '1rem 2rem'};
  box-shadow: inset 4px 3px 9px ${({ theme }) => theme.shadow},
    inset -4px -3px 9px ${({ theme }) => theme.light};
  outline: 0;
  border: 0;
  font-weight: 600;
  font-size: 1.3rem;
  letter-spacing: 0.025em;
  border-radius: 3rem;
  text-align: center;
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
  &.is-invalid {
    border: solid 1px ${({ theme }) => theme.danger};
  }
`;

export const InputField: React.FC<IProps> = props => {
  return <StyledInputField {...props} ref={props.inputRef} />;
};
