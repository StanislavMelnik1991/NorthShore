import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { TableControls, TableText } from '@entities/components';
import { IRequest } from '@entities/types';
import {
  IconNew,
  IconPassed,
  IconAccepted,
  IconDone,
  IconClosed,
} from '@shared/icons';
import styles from './tableRequestsRows.module.scss';

interface Props {
  data: Array<IRequest>;
  getDetails: (id?: string | number) => void;
}

export const useTableRequestsRows = ({ data, getDetails }: Props) => {
  const { i18n } = useTranslation('residents');
  return data.map(({ id, status, data_add, theme, title, comment }) => {
    return {
      id: <TableText>{String(id)}</TableText>,
      status: (
        <TableText
          className={classNames(styles.status_raw, {
            [styles.gray]: status.id === 5,
            [styles.green]: status.id === 3 || status.id === 4,
            [styles.primary]: status.id === 1,
            [styles.orange]: status.id === 2,
          })}
        >
          {status.id === 1 && <IconNew />}
          {status.id === 2 && <IconPassed />}
          {status.id === 3 && <IconAccepted />}
          {status.id === 4 && <IconDone />}
          {status.id === 5 && <IconClosed />}
          {String(status.name)}
        </TableText>
      ),
      date: (
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
      topic: <TableText>{String(theme.name)}</TableText>,
      title: <TableText>{title ? String(title) : ''}</TableText>,
      comment: <TableText>{comment}</TableText>,
      controls: <TableControls getDetails={() => getDetails(id)} id={id} />,
    };
  });
};
