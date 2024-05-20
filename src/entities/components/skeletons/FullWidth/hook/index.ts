import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

export const useFullWidthSkeleton = () => {
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate(AppRoutes[AppRoutesEnum.MAIN]());
  }, [navigate]);
  return { handleClose };
};
