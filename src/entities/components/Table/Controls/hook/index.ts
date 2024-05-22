import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
  point?: {
    lat?: number;
    lon?: number;
  };
  getUpdateRoute?: ((id: number) => string) | false;
  getDetailsRoute?: ((id: number) => string) | false;
  getNotificationRoute?: (id: number) => string;
}

export const useVideoCardControls = ({
  getDetailsRoute,
  getUpdateRoute,
  getNotificationRoute,
  id,
  point,
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isShow, setIsShow] = useState(false);

  const handleGoToUpdate = useCallback(async () => {
    if (!getUpdateRoute) {
      return;
    }
    navigate(getUpdateRoute(id));
  }, [getUpdateRoute, id, navigate]);

  const handleGoToNotificate = useCallback(async () => {
    if (!getNotificationRoute) {
      return;
    }
    navigate(getNotificationRoute(id));
  }, [getNotificationRoute, id, navigate]);

  const handleGoToDetails = useCallback(async () => {
    if (!getDetailsRoute) {
      return;
    }
    navigate(getDetailsRoute(id));
  }, [getDetailsRoute, id, navigate]);

  const handleMapOpen = useCallback(() => {
    if (!point) {
      return;
    } else {
      const { lat, lon } = point;
      const url = `https://yandex.ru/maps/?ll=${lon}%2C${lat}&z=17&pt=${lon}%2C${lat}`;
      window.open(url, '_blank');
    }
  }, [point]);

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
    handleGoToNotificate,
    isShow,
    setIsShow,
    handleMapOpen,
    t,
    wrapperRef,
  };
};
