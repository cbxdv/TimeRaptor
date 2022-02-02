import React from 'react';
import styled from 'styled-components';

import { buttonStyles } from '../styles/styleUtils';

const IconButton: React.FC<IconButtonProps> = ({ Icon, label, onClick }) => (
  <IconButtonContainer labelLength={label.length} onClick={onClick}>
    {Icon !== undefined && <Icon />}
    {label.length !== 0 && label}
  </IconButtonContainer>
);

type IconButtonProps = {
  Icon: React.FunctionComponent;
  label?: string;
  onClick: () => void;
};

IconButton.defaultProps = {
  label: ''
};

const IconButtonContainer = styled.div<{ labelLength: number }>`
  ${buttonStyles()};
  height: 40px;
  width: ${({ labelLength }) => (labelLength === 0 ? `40px` : `120px`)};
  font-family: Outfit;
  font-size: 18px;
  font-weight: 700;

  & > svg {
    margin-right: ${({ labelLength }) => (labelLength === 0 ? `0` : `10px`)};
  }
`;

export default IconButton;
