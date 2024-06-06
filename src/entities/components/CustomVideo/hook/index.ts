import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EquipmentCondition } from '@shared/constants';

interface Props {
  initialError?: boolean;
}

export const useCustomVideo = ({ initialError }: Props) => {
  const playerRef = useRef<HTMLVideoElement>();
  const { t } = useTranslation('security');
  const [isError, setIsError] = useState(initialError || false);
  const [status, setStatus] = useState<keyof typeof EquipmentCondition>(
    initialError ? 3 : 1,
  );

  const onErrorHandler = useCallback(() => {
    console.error('asdasd');
    setIsError(true);
    setStatus(2);
  }, []);

  return {
    isError,
    onErrorHandler,
    t,
    status,
    playerRef,
  };
};
