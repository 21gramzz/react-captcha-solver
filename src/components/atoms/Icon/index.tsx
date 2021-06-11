import React from 'react';
import styled from 'styled-components';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

interface IProps extends FontAwesomeIconProps {
  margin?: string;
}

const StyledIcon = styled(FontAwesomeIcon)<Pick<IProps, 'margin'>>`
  margin: ${({ margin }) => margin || '0'};
`;

export const Icon: React.FC<IProps> = props => {
  return <StyledIcon {...props} />;
};
