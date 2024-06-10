import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { formatAddress } from '@features/utils';
import { TableControls, TableText } from '@entities/components';
import { INotification } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconCheck, IconClose } from '@shared/icons';
import { Badge } from '@shared/ui';

export const useTableRows = (data: Array<INotification>) => {
  const { i18n } = useTranslation();
  return data.map(
    ({ id, title, data_add, need_push, recipient_groups = [] }) => {
      const addressString = recipient_groups.map((el) => {
        return formatAddress(el);
      });
      return {
        id: <TableText>{String(id)}</TableText>,
        sendDate: (
          <TableText>
            {data_add ? format(data_add * 1000, 'dd.MM.yyyy') : '-'}
          </TableText>
        ),
        title: (
          <TableText fontWeight="medium">
            {title?.[i18n.language as 'en' | 'ru'] || '-'}
          </TableText>
        ),
        notification: (
          <Badge color={need_push ? 'green' : 'white'}>
            {need_push ? (
              <IconCheck style={{ marginRight: 4 }} width={16} height={16} />
            ) : (
              <IconClose style={{ marginRight: 4 }} width={16} height={16} />
            )}
            {'Push'}
          </Badge>
        ),
        recipient_groups: (
          <TableText>
            {recipient_groups.length ? addressString.join('; ') : 'все'}
          </TableText>
        ),
        controls: (
          <TableControls
            getDetailsRoute={
              AppRoutes[AppRoutesEnum.ADMIN_NOTIFICATIONS_CURRENT]
            }
            id={id}
          />
        ),
      };
    },
  );
};
