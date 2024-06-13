import { useTranslation } from 'react-i18next';
import { extractTextFromHtml } from '@features/utils';
import { TableControls, TableText } from '@entities/components';
import { INotification } from '@entities/types';
import { LanguageEnum } from '@shared/constants';
import styles from './tableNotificationsRows.module.scss';

interface Props {
  data: Array<INotification>;
  getDetails: (id?: string | number) => void;
}

export const useTableNotificationsRows = ({ data, getDetails }: Props) => {
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
            __html: extractTextFromHtml(body[lang] || ''),
          }}
        />
      ),
      controls: <TableControls getDetails={() => getDetails(id)} id={id} />,
    };
  });
};
