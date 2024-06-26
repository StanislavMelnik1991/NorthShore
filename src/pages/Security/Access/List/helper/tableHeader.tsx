import { useTranslation } from 'react-i18next';
import {
  BuildingSelection,
  StreetSelection,
  EntranceSelection,
} from '@widgets/addressSelection';
import { TableFilter } from '@widgets/Table';
import { ISelectOption, TableSelect } from '@entities/components';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui';

interface AddressWrapper<T> {
  street: T;
  building: T;
  entrance: T;
  type: T;
}

interface Props {
  value: AddressWrapper<ISelectOption | null>;
  onChange: AddressWrapper<(val: ISelectOption | null) => void>;
  options: Partial<AddressWrapper<ISelectOption[] | undefined>>;
}

export const useTableHeader: (props: Props) => Array<ConfigItemType> = ({
  onChange,
  value,
  options,
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
      name: 'name',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.name')}
        </Text>
      ),
    },
    {
      name: 'type',
      label: (
        <TableFilter
          label={t('header.type')}
          isActive={!!value.type}
          filter={
            <TableSelect
              value={value.type}
              placeholder={t('controls.find')}
              onChange={(val) => onChange.type(val as ISelectOption)}
              options={options.type?.map(({ label, value }) => {
                return {
                  value,
                  label,
                };
              })}
            />
          }
        />
      ),

      width: 153,
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
      name: 'state',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.state')}
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
