import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { formatAddress } from '@features/utils';
import { TableControls, TableText } from '@entities/components';
import {
  TableIconCheck,
  TableIconClose,
} from '@entities/components/Table/Icons';
import { IVoting } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Badge } from '@shared/ui';

interface Props {
  data: Array<IVoting>;
  onDelete: (id: number) => () => void;
  onMarkAsFailed: (id: number) => () => void;
}

export const useTableRows = ({ data, onDelete, onMarkAsFailed }: Props) => {
  const { i18n } = useTranslation();
  return data.map(
    ({ id, title, date_finish, status, recipient_groups, show_result }) => {
      const groupsArr = recipient_groups.map((el) => {
        return formatAddress(el);
      });
      return {
        id: <TableText>{String(id)}</TableText>,
        status: (
          <Badge
            color={
              status.id === 2 ? 'green' : status.id === 1 ? 'orange' : 'white'
            }
          >
            {status.name}
          </Badge>
        ),
        deadline: (
          <TableText>{format(date_finish * 1000, 'dd.MM.yyyy')}</TableText>
        ),
        title: (
          <TableText fontWeight="medium">
            {title[i18n.language as 'en' | 'ru']}
          </TableText>
        ),
        group: <TableText>{groupsArr.join('; ')}</TableText>,
        showResults: show_result ? <TableIconCheck /> : <TableIconClose />,
        controls: (
          <TableControls
            getDetailsRoute={AppRoutes[AppRoutesEnum.ADMIN_VOTING_CURRENT]}
            getUpdateRoute={
              status.id === 1 && AppRoutes[AppRoutesEnum.ADMIN_VOTING_UPDATE]
            }
            onDelete={onDelete(id)}
            onMarkAsFailed={status.id === 2 && onMarkAsFailed(id)}
            rotateIcon={false}
            id={id}
          />
        ),
      };
    },
  );
};
