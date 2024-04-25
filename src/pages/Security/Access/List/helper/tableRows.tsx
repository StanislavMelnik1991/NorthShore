import { MouseEventHandler } from 'react';
import { VideoCardControls } from '@widgets/Security/Controls';
import { TableText } from '@entities/components';
import { SecurityAccess } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

interface Props {
  data: Array<SecurityAccess>;
  onDelete: (id: string | number) => MouseEventHandler<HTMLDivElement>;
  onOpen: (id: string | number) => MouseEventHandler<HTMLDivElement>;
}

export const useTableRows = ({ data, onDelete, onOpen }: Props) => {
  return data.map(
    ({ id, street, building, entrance, status, lat, lon, type }) => {
      return {
        id: <TableText text={`№ ${String(id)}`} />,
        type: <TableText text={type.name} />,
        street: <TableText text={street.name} />,
        building: <TableText text={building.name} />,
        entrance: <TableText text={entrance.name} />,
        state: <TableText text={status.name} />,
        controls: (
          <VideoCardControls
            lat={lat}
            lon={lon}
            onDelete={onDelete(id)}
            onOpen={onOpen(id)}
            getDetailsRoute={AppRoutes[AppRoutesEnum.NEWS_CURRENT]}
            getUpdateRoute={AppRoutes[AppRoutesEnum.UPDATE_NEWS]}
            id={id}
          />
        ),
      };
    },
  );
};
