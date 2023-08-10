import { useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';

type RedirectProps = {
  //
}

export const RedirectToDashboard: FC<RedirectProps> = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  return null;
};
