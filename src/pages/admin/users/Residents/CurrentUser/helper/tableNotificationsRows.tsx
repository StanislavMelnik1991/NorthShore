import { useTranslation } from 'react-i18next';
import { extractTextFromHtml } from '@features/utils';
import { TableText } from '@entities/components';
import { IResidentNotification } from '@entities/types';
import { LanguageEnum } from '@shared/constants';
import styles from './tableNotificationsRows.module.scss';

export const useTableNotificationsRows = (
  data: Array<IResidentNotification>,
) => {
  const { i18n } = useTranslation('residents');
  const lang = i18n.language as LanguageEnum;
  return data.map(({ id, data_add, title, body }) => {
    return {
      id: <TableText>{String(id)}</TableText>,
      disp_date: (
        <TableText>
          {String(
            new Date(data_add * 1000).toLocaleDateString(i18n.language, {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
            }),
          )}
        </TableText>
      ),
      title: <TableText>{title[lang]}</TableText>,
      body: (
        <div
          className={styles.htmlContent}
          dangerouslySetInnerHTML={{
            __html: extractTextFromHtml(body[lang]),
          }}
        />
      ),
    };
  });
};
