import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import {
  useGetKBaseList,
  useKBaseThemesList,
  useGetKBaseWithThemeList,
} from '@features/kbase';
import { IKBase } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

export const useNewsListPage = () => {
  const { t, i18n } = useTranslation('kbase');
  const [search, setSearch] = useState('');
  const [data, setData] = useState<IKBase[]>([]);

  const [debounced] = useDebounce(search, 500);
  const {
    getData: getThemesList,
    isLoading: isThemesListLoading,
    options: themes,
    selected: selectedTheme,
    setSelected: setSelectedTheme,
  } = useKBaseThemesList();

  const { getData, isLoading } = useGetKBaseList();
  const { getData: getDataWithTheme, isLoading: isLoadingWithTheme } =
    useGetKBaseWithThemeList();

  const handleGetData = useCallback(async () => {
    if (selectedTheme) {
      const data = await getDataWithTheme({
        params: {
          search_query: debounced === '' ? undefined : debounced,
        },
        themeId: selectedTheme.value,
      });
      if (data) {
        setData(data);
      }
    } else {
      const data = await getData({
        search_query: debounced === '' ? undefined : debounced,
      });
      if (data) {
        setData(data);
      }
    }
  }, [debounced, getData, getDataWithTheme, selectedTheme]);

  useEffect(() => {
    getThemesList();
  }, [getThemesList]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  return {
    t,
    themes,
    isThemesListLoading,
    setSelectedTheme,
    setSearch,
    isLoading: isLoading || isLoadingWithTheme,
    selectedTheme,
    search,
    data,
    language: i18n.language as LanguageEnum,
  };
};
