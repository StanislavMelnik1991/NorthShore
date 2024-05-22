import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserActivitiesList } from '@features/activities';
import { ListParams } from '@entities/types';
import { INITIAL_PER_PAGE, LanguageEnum } from '@shared/constants';

interface Props {
  defaultSlide?: number;
}

export const useActivitiesSlider = ({ defaultSlide = 0 }: Props) => {
  const { t, i18n } = useTranslation();
  const { getData, isLoading, data } = useGetUserActivitiesList();
  const [slide, setSlide] = useState(defaultSlide);

  useEffect(() => {
    const activitiesParams: ListParams = {
      page: 1,
      perPage: INITIAL_PER_PAGE,
    };
    getData(activitiesParams);
  }, [getData]);
  return {
    activities: data,
    t,
    lang: i18n.language as LanguageEnum,
    slide,
    setSlide,
    isLoading,
  };
};
