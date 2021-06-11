import React from 'react';
import styled from 'styled-components';

interface IProps {
  children: React.ReactNode;
  className?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  margin?: string;
  padding?: string;
}

const StyledHeading1 = styled.h2<
  Pick<IProps, 'color' | 'fontSize' | 'fontWeight' | 'margin' | 'padding'>
>`
  user-select: none;
  color: ${({ color, theme }) => color || theme.text};
  font-size: ${({ fontSize }) => fontSize || '2rem'};
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
`;

const StyledHeading2 = styled.h2<
  Pick<IProps, 'color' | 'fontSize' | 'fontWeight' | 'margin' | 'padding'>
>`
  user-select: none;
  color: ${({ color, theme }) => color || theme.text};
  font-size: ${({ fontSize }) => fontSize || '1.5rem'};
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
`;

const StyledHeading3 = styled.h2<
  Pick<IProps, 'color' | 'fontSize' | 'fontWeight' | 'margin' | 'padding'>
>`
  user-select: none;
  color: ${({ color, theme }) => color || theme.text};
  font-size: ${({ fontSize }) => fontSize || '1.2rem'};
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
`;

export const Heading1: React.FC<IProps> = props => {
  return <StyledHeading1 {...props}>{props.children}</StyledHeading1>;
};

export const Heading2: React.FC<IProps> = props => {
  return <StyledHeading2 {...props}>{props.children}</StyledHeading2>;
};

export const Heading3: React.FC<IProps> = props => {
  return <StyledHeading3 {...props}>{props.children}</StyledHeading3>;
};
