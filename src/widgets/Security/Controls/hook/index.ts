import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
  lat?: number;
  lon?: number;
  getUpdateRoute(id: number): string;
  getDetailsRoute(id: number): string;
}

export const useVideoCardControls = ({
  getDetailsRoute,
  getUpdateRoute,
  id,
  lat,
  lon,
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation('security');

  const [isShow, setIsShow] = useState(false);

  const handleGoToUpdate = useCallback(async () => {
    navigate(getUpdateRoute(id));
  }, [getUpdateRoute, id, navigate]);

  const handleGoToDetails = useCallback(async () => {
    navigate(getDetailsRoute(id));
  }, [getDetailsRoute, id, navigate]);

  const handleMapOpen = useCallback(() => {
    const url = `https://yandex.ru/maps/?ll=${lon}%2C${lat}&z=17&pt=${lon}%2C${lat}`;
    window.open(url, '_blank');
  }, [lat, lon]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsShow(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [wrapperRef]);

  return {
    handleGoToUpdate,
    handleGoToDetails,
    isShow,
    setIsShow,
    handleMapOpen,
    t,
    wrapperRef,
  };
};
