import { MouseEventHandler } from 'react';
import { TableControls, TableText } from '@entities/components';
import { SecurityAccess } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

interface Props {
  data: Array<SecurityAccess>;
  onDelete: (id: string | number) => MouseEventHandler<HTMLDivElement>;
  onOpen: (id: string | number) => MouseEventHandler<HTMLDivElement>;
}

export const useTableRows = ({ data, onDelete, onOpen }: Props) => {
  return data.map(
    ({ id, street, building, entrance, status, lat, lon, type, name }) => {
      return {
        id: <TableText>{`№ ${String(id)}`}</TableText>,
        name: <TableText>{name || '-'}</TableText>,
        type: <TableText>{type.name || '-'}</TableText>,
        street: <TableText>{street?.name || '-'}</TableText>,
        building: <TableText>{building?.name || '-'}</TableText>,
        entrance: <TableText>{entrance?.name || '-'}</TableText>,
        state: <TableText>{status.name || '-'}</TableText>,
        controls: (
          <TableControls
            point={{ lat, lon }}
            onDelete={onDelete(id)}
            onOpen={onOpen(id)}
            getDetailsRoute={AppRoutes[AppRoutesEnum.SECURITY_ACCESS_CURRENT]}
            getUpdateRoute={AppRoutes[AppRoutesEnum.SECURITY_ACCESS_UPDATE]}
            id={id}
          />
        ),
      };
    },
  );
};
