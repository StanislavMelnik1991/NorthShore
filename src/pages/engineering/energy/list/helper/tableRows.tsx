import { format } from 'date-fns';
import { TableControls, TableText } from '@entities/components';
import { IEngineeringFull } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

export const useTableRows = (data: IEngineeringFull[]) => {
  return data.map(
    ({
      id,
      type,
      apartment,
      charge_status,
      operating_mode,
      voltage,
      last_check_date,
      current_value,
    }) => {
      const street = apartment.entrance.building.street;
      const building = apartment.entrance.building;
      const entrance = apartment.entrance;
      const location = `${street ? `${street.name}` : ''}${building ? `, ${building.name}` : ''}${entrance ? `, ${entrance.name}` : ''} ${apartment ? `, ${apartment.name}` : ''}`;
      return {
        id: <TableText>{String(id)}</TableText>,
        type: <TableText>{type?.name}</TableText>,
        address: <TableText title={location}>{location}</TableText>,
        state: (
          <TableText>{operating_mode ? operating_mode.name : ''}</TableText>
        ),
        lastData: (
          <TableText>
            {current_value ? `${current_value} ${type.measures}` : ''}
          </TableText>
        ),
        lastUpdate: (
          <TableText>
            {last_check_date
              ? format(last_check_date * 1000, 'dd.MM.yyyy')
              : ''}
          </TableText>
        ),
        voltage: <TableText>{voltage || ''}</TableText>,
        chargingStatus: (
          <TableText>{charge_status ? charge_status.name : ''}</TableText>
        ),
        controls: (
          <TableControls
            getDetailsRoute={
              AppRoutes[AppRoutesEnum.ENGINEERING_ENERGY_CURRENT]
            }
            id={id}
          />
        ),
      };
    },
  );
};
