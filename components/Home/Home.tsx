// import Router from 'next/router';
import React from 'react';
import MyComponent from './MyConponent';
import XAPIWrapper from './XAPIWrapper';

const Main: React.FC = () => {
  return (
    <XAPIWrapper>
      <MyComponent />
    </XAPIWrapper>
  );
};

export default Main;
