import { useTranslation } from 'react-i18next';
import {
  BuildingSelection,
  StreetSelection,
  EntranceSelection,
  ApartmentSelection,
} from '@widgets/addressSelection';
import { TableFilter } from '@widgets/Table';
import { ISelectOption } from '@entities/components';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui';

interface AddressWrapper<T> {
  street: T;
  building: T;
  entrance: T;
  apartment: T;
}

interface Props {
  value: AddressWrapper<ISelectOption | null>;
  onChange: AddressWrapper<(val: ISelectOption | null) => void>;
}

export const useTableHeader: (props: Props) => Array<ConfigItemType> = ({
  onChange,
  value,
}) => {
  const { t } = useTranslation('table');
  return [
    {
      name: 'id',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.index')}
        </Text>
      ),
      width: 92,
    },
    {
      name: 'street',
      label: (
        <TableFilter
          label={t('header.street')}
          isActive={!!value.street}
          filter={
            <StreetSelection onChange={onChange.street} value={value.street} />
          }
        />
      ),
    },
    {
      name: 'building',
      label: (
        <TableFilter
          label={t('header.building')}
          disabled={!value.street}
          isActive={!!value.building}
          filter={
            <BuildingSelection
              streetId={value.street?.value}
              onChange={onChange.building}
              value={value.building}
            />
          }
        />
      ),
      width: 200,
    },
    {
      name: 'entrance',
      label: (
        <TableFilter
          label={t('header.entrance')}
          disabled={!value.building}
          isActive={!!value.entrance}
          filter={
            <EntranceSelection
              streetId={value.building?.value}
              onChange={onChange.entrance}
              value={value.entrance}
            />
          }
        />
      ),
      width: 200,
    },
    {
      name: 'apartment',
      label: (
        <TableFilter
          label={t('header.apartment')}
          disabled={!value.entrance}
          isActive={!!value.apartment}
          filter={
            <ApartmentSelection
              entranceId={value.apartment?.value}
              onChange={onChange.apartment}
              value={value.apartment}
            />
          }
        />
      ),
      width: 200,
    },
    {
      name: 'uuid',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.uuid')}
        </Text>
      ),
      width: 200,
    },

    {
      name: 'controls',
      width: 52,
    },
  ];
};
