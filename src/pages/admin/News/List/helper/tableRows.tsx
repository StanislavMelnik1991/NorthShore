import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { extractTextFromHtml } from '@features/utils/html';
import { TableBadge, TableControls, TableText } from '@entities/components';
import { INews } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

export const useTableRows = (data: Array<INews>) => {
  const { i18n } = useTranslation();
  return data.map(({ id, status, title, html_content, published_at }) => {
    return {
      id: <TableText>{String(id)}</TableText>,
      status: <TableBadge status={status || 0} />,
      title: (
        <TableText fontWeight="medium">
          {title[i18n.language as 'en' | 'ru']}
        </TableText>
      ),
      date: <TableText>{format(published_at * 1000, 'dd.MM.yyyy')}</TableText>,
      text: (
        <TableText>
          {extractTextFromHtml(html_content[i18n.language as 'en' | 'ru'])}
        </TableText>
      ),
      controls: (
        <TableControls
          getDetailsRoute={AppRoutes[AppRoutesEnum.NEWS_CURRENT]}
          getUpdateRoute={AppRoutes[AppRoutesEnum.UPDATE_NEWS]}
          id={id}
        />
      ),
    };
  });
};
