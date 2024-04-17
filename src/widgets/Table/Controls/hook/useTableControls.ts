import { RefObject, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, INews } from '@entities/types';

interface Props {
  id: number;
  genUpdateRoute(id: number): string;
  genDetailsRoute(id: number): string;
  wrapperRef: RefObject<HTMLDivElement>;
}

export const useTableControls = ({
  genDetailsRoute,
  genUpdateRoute,
  id,
  wrapperRef,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation('table');

  const [isShow, setIsShow] = useState(false);

  const handleArchive = useCallback(async () => {
    try {
      await axiosApi.post<BaseResponse<INews>>(`/news/${id}`, {
        status: 2,
      });
      toast.success(t('toast.archiveSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(t('toast.archiveError'));
    }
  }, [id, t]);

  const handleGoToUpdate = useCallback(async () => {
    navigate(genUpdateRoute(id));
  }, [genUpdateRoute, id, navigate]);

  const handleGoToDetails = useCallback(async () => {
    navigate(genDetailsRoute(id));
  }, [genDetailsRoute, id, navigate]);

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
    handleArchive,
    handleGoToUpdate,
    handleGoToDetails,
    isShow,
    setIsShow,
  };
};
