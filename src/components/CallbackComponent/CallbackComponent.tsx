import React, { useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';

type CallbackComponentProps = {
    //
  }

export const CallbackComponent: FC<CallbackComponentProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming Auth0 SDK processes the callback automatically
    navigate('/dashboard');
  }, [navigate]);

  return <div>Processing authentication...</div>;
};
