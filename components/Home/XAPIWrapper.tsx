import XAPI from '@xapi/xapi';
import React, { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export interface XAPIWrapperProps {
  xAPI?: XAPI | null;
}

const XAPIWrapper: React.FC<Props> = ({ children }) => {
  const [xAPIInstance, setXAPIInstance] = useState<XAPI | null>(null);

  useEffect(() => {
    const endpoint = 'https://cloud.scorm.com/lrs/61G2CX2714/sandbox/';
    const username = 'wEdoyPW7CI4i6ccHOqg';
    const password = 'ZI4haFDtrSAQ7Lctrr8';
    const auth = XAPI.toBasicAuth(username, password);
    const xAPIInstance = new XAPI({
      endpoint: endpoint,
      auth: auth,
    });
    setXAPIInstance(xAPIInstance);
  }, []);

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<XAPIWrapperProps>(child)) {
          return React.cloneElement(child, { xAPI: xAPIInstance });
        }
        return child;
      })}
    </div>
  );
};

export default XAPIWrapper;
