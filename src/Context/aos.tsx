import React, { useEffect, ReactNode } from 'react';
import 'aos/dist/aos.css'; 
import AOS from 'aos';

interface AOSWrapperProps {
  children: ReactNode;
}

const AOSWrapper: React.FC<AOSWrapperProps> = ({ children }) => {
  useEffect(() => {
    AOS.init(); 
  }, []);

  return <>{children}</>;
};

export default AOSWrapper;
