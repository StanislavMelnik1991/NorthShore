import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  IRole,
  ListParams,
  PaginationResponse,
} from '@entities/types';

interface Params extends ListParams {}

interface ResponseDataType extends PaginationResponse {
  roles: Array<IRole>;
}
export const useGetInfinityRolesList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<ResponseDataType>>(
          `/roles`,
          { params },
        );
        if (data?.data?.roles) {
          setTotal(data.data.total_pages);
          return data.data.roles;
        } else {
          toast.error(t('errors.getError'));
        }
      } catch (error) {
        toast.error(t('errors.getError'));
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  return {
    getData,
    isLoading,
    total,
  };
};
