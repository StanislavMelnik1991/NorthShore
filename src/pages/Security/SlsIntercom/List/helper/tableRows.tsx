import { MouseEventHandler } from 'react';
import { TableControls, TableText } from '@entities/components';
import { SecuritySlsIntercom } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

interface Props {
  data: Array<SecuritySlsIntercom>;
  onDelete: (id: string | number) => MouseEventHandler<HTMLDivElement>;
}

export const useTableRows = ({ data, onDelete }: Props) => {
  return data.map(({ id, apartment, uuid }) => {
    return {
      id: <TableText>{`№ ${String(id)}`}</TableText>,
      street: (
        <TableText>
          {apartment?.entrance?.building?.street?.name || '-'}
        </TableText>
      ),
      building: (
        <TableText>{apartment?.entrance?.building?.name || '-'}</TableText>
      ),
      entrance: <TableText>{apartment?.entrance.name || '-'}</TableText>,
      apartment: <TableText>{apartment?.name || '-'}</TableText>,
      uuid: <TableText>{uuid || '-'}</TableText>,

      controls: (
        <TableControls
          onDelete={onDelete(id)}
          getDetailsRoute={
            AppRoutes[AppRoutesEnum.SECURITY_SLS_INTERCOM_CURRENT]
          }
          getUpdateRoute={AppRoutes[AppRoutesEnum.SECURITY_SLS_INTERCOM_UPDATE]}
          id={id}
        />
      ),
    };
  });
};
