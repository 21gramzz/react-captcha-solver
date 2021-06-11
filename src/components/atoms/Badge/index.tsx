import React from 'react';
import styled from 'styled-components';

interface IProps {
  children: React.ReactNode;
  className?: string;
  margin?: string;
  color?: string;
  backgroundColor?: string;
}

const StyledBadge = styled.div<Pick<IProps, 'margin'>>`
  display: inline-block;
  margin: ${({ margin }) => margin || '0'};
  padding: 0.4rem;
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.main};
  font-weight: 500;
  box-shadow: 0.4rem 0.3rem 0.9rem ${({ theme }) => theme.shadow},
    -0.4rem -0.3rem 0.9rem ${({ theme }) => theme.light};
`;

const BadgeInner = styled.div<Pick<IProps, 'backgroundColor' | 'color'>>`
  padding: 0.2rem 0.9rem;
  font-size: 1.2rem;
  color: ${({ color, theme }) => color || theme.text};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.success};
  border-radius: 1.5rem;
  white-space: nowrap;
`;

export const Badge: React.FC<IProps> = ({
  className,
  color,
  backgroundColor,
  margin,
  children,
}) => {
  return (
    <StyledBadge className={className} margin={margin}>
      <BadgeInner backgroundColor={backgroundColor} color={color}>
        {children}
      </BadgeInner>
    </StyledBadge>
  );
};
