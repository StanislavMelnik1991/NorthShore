import { MouseEventHandler } from 'react';
import { TableControls, TableText } from '@entities/components';
import { SecurityIntercom } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconInfo } from '@shared/icons';
import { Dot } from '@shared/ui/Dot';

interface Props {
  data: Array<SecurityIntercom>;
  onDelete: (id: string | number) => MouseEventHandler<HTMLDivElement>;
  onOpen: (id: string | number) => MouseEventHandler<HTMLDivElement>;
}

export const useTableRows = ({ data, onDelete, onOpen }: Props) => {
  return data.map(({ id, entrance, status }) => {
    return {
      id: <TableText>{`№ ${String(id)}`}</TableText>,
      street: <TableText>{entrance?.building?.street?.name || ''}</TableText>,
      building: <TableText>{entrance?.building?.name || ''}</TableText>,
      entrance: <TableText>{entrance?.name || ''}</TableText>,
      state: (
        <TableText>
          {(status?.id === 1 || status?.id === 2 || status?.id === 3) && (
            <Dot
              color={
                status?.id === 1 ? 'green' : status?.id === 2 ? 'red' : 'dark'
              }
            />
          )}
          {(!status || status?.id === 4) && <IconInfo />}
          {status?.name || 'Статус неизвестен'}
        </TableText>
      ),
      controls: (
        <TableControls
          onDelete={onDelete(id)}
          onOpen={onOpen(id)}
          getDetailsRoute={AppRoutes[AppRoutesEnum.SECURITY_INTERCOM_CURRENT]}
          getUpdateRoute={AppRoutes[AppRoutesEnum.SECURITY_INTERCOM_UPDATE]}
          id={id}
        />
      ),
    };
  });
};
