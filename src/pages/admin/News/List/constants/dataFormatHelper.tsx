import { useTranslation } from 'react-i18next';
import { TableControls } from '@widgets/Table';
import { extractTextFromHtml } from '@features/utils/html';
import { TableBadge, TableText } from '@entities/components';
import { INews } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

export const useDataFormatHelper = (data: Array<INews>) => {
  const { i18n } = useTranslation();
  return data.map(({ id, status, title, html_content, published_at }) => {
    return {
      id: <TableText text={String(id)} />,
      status: <TableBadge status={status || 0} />,
      title: (
        <TableText
          text={title[i18n.language as 'en' | 'ru']}
          fontWeight="medium"
        />
      ),
      date: (
        <TableText text={new Date(published_at * 1000).toLocaleDateString()} />
      ),
      text: (
        <TableText
          text={extractTextFromHtml(html_content[i18n.language as 'en' | 'ru'])}
        />
      ),
      controls: (
        <TableControls
          genDetailsRoute={AppRoutes[AppRoutesEnum.NEWS_CURRENT]}
          genUpdateRoute={AppRoutes[AppRoutesEnum.UPDATE_NEWS]}
          id={id}
        />
      ),
    };
  });
};
