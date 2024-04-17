import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { TableControls } from '@widgets/Table';
import { TableBadge, TableText } from '@entities/components';
import { INews } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

export const useDataFormatHelper = (data: Array<INews>) => {
  const { i18n } = useTranslation();
  return data.map(({ id, title, published_at, status, target_date }) => {
    return {
      id: <TableText text={String(id)} />,
      status: <TableBadge status={status || 0} />,
      title: (
        <TableText
          text={title[i18n.language as 'en' | 'ru']}
          fontWeight="medium"
        />
      ),
      date: <TableText text={format(target_date * 1000, 'dd.MM.yyyy HH:mm')} />,
      published: <TableText text={format(published_at * 1000, 'dd.MM.yyyy')} />,
      controls: (
        <TableControls
          genDetailsRoute={AppRoutes[AppRoutesEnum.MEETINGS_CURRENT]}
          genUpdateRoute={AppRoutes[AppRoutesEnum.UPDATE_MEETINGS]}
          id={id}
        />
      ),
    };
  });
};
