import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { TableBadge, TableControls, TableText } from '@entities/components';
import { INews } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

interface Props {
  data: Array<INews>;
  handleOpen: (id: number | string) => () => void;
}

export const useTableRows = ({ data, handleOpen }: Props) => {
  const { i18n } = useTranslation();
  return data.map(({ id, title, published_at, status, target_date }) => {
    return {
      id: <TableText>{String(id)}</TableText>,
      status: <TableBadge status={status || 0} />,
      title: (
        <TableText fontWeight="medium">
          {title?.[i18n.language as 'en' | 'ru'] || '-'}
        </TableText>
      ),
      date: (
        <TableText>
          {target_date ? format(target_date * 1000, 'dd.MM.yyyy HH:mm') : '-'}
        </TableText>
      ),
      published: (
        <TableText>
          {published_at ? format(published_at * 1000, 'dd.MM.yyyy') : '-'}
        </TableText>
      ),
      controls: (
        <TableControls
          getDetails={handleOpen(id)}
          getUpdateRoute={AppRoutes[AppRoutesEnum.UPDATE_EVENT]}
          id={id}
        />
      ),
    };
  });
};
