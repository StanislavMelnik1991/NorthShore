import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  INews,
  INewsFilter,
  INewsSort,
  ListParams,
} from '@entities/types';

interface Params extends ListParams {
  sort: INewsSort;
  filter: INewsFilter;
}

export const useGetMeetingsList = () => {
  const { t } = useTranslation('meetings');
  const getData = useCallback(
    async (params: Params) => {
      try {
        const {
          data: { data },
        } = await axiosApi.get<BaseResponse<Array<INews>>>('/meetings', {
          params,
        });
        return data;
      } catch (error) {
        toast.error(t('toast.listError'));
        console.error(error);
      }
    },
    [t],
  );

  return {
    getData,
  };
};
