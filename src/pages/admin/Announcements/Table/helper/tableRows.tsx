import { format } from 'date-fns';
import { MouseEventHandler } from 'react';
import { TableControls, TableText } from '@entities/components';
import { IAnnouncement } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

interface Props {
  data: Array<IAnnouncement>;
  onDelete: (id: number) => MouseEventHandler<HTMLDivElement>;
}

export const useTableRows = ({ data, onDelete }: Props) => {
  return data.map(({ id, title, recipient_groups, date_add }) => {
    const groupsArr = recipient_groups.map((el) => {
      return el.department.name;
    });
    return {
      id: <TableText>{String(id)}</TableText>,
      title: <TableText fontWeight="medium">{title || '-'}</TableText>,
      group: <TableText>{groupsArr.join('; ')}</TableText>,
      date: (
        <TableText>
          {date_add ? format(date_add * 1000, 'dd.MM.yyyy') : '-'}
        </TableText>
      ),
      controls: (
        <TableControls
          onDelete={onDelete(id)}
          getUpdateRoute={
            AppRoutes[AppRoutesEnum.ADMIN_EMPLOYEE_ANNOUNCEMENTS_UPDATE]
          }
          id={id}
        />
      ),
    };
  });
};
