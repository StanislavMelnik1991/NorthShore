import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse } from '@entities/types';
import { IRequest } from '@entities/types/request.interface';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

export const useCurrentEvent = () => {
  const { t, i18n } = useTranslation('invocation');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IRequest>();

  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get<BaseResponse<IRequest>>(`request/${id}`)
      .then(({ data }) => {
        if (data.data) {
          setData(data.data);
        } else {
          toast.error(t('toast.notFound'));
          navigation(AppRoutes[AppRoutesEnum.REQUESTS]());
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(t('toast.notFound'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, navigation, t]);
  return { data, isLoading, t, i18n };
};
