import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../state';

export const RedirectToHome: React.FC = () => {
  const navigate = useNavigate();
  const { setShouldOpenAuth } = useAppContext();

  useEffect(() => {
    setShouldOpenAuth(true);
    navigate('/', { replace: true });
  }, [navigate, setShouldOpenAuth]);

  return null;
};
