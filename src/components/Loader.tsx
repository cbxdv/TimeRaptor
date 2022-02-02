import React from 'react';
import styled from 'styled-components';

const Loader = () => <Ring />;

const Ring = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &::after {
    content: '';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #ffffff;
    border-color: #ffffff transparent #ffffff transparent;
    animation: ring-animation 1.2s linear infinite;
  }
  @keyframes ring-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
