import { useTranslation } from 'react-i18next';
import { TableFilter } from '@widgets/Table';
import { ISelectOption, TableSelect } from '@entities/components';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui';

interface AddressWrapper<T> {
  state: T;
  type: T;
  chargingStatus: T;
}

interface Props {
  value: AddressWrapper<ISelectOption | null>;
  onChange: AddressWrapper<(val: ISelectOption | null) => void>;
  options: Partial<AddressWrapper<ISelectOption[] | undefined>>;
  isLoading: AddressWrapper<boolean>;
}

export const useTableHeader: (props: Props) => Array<ConfigItemType> = ({
  onChange,
  isLoading,
  options,
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
    },
    {
      name: 'name',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.number')}
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
              isLoading={isLoading.type}
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
    },

    {
      name: 'address',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.address')}
        </Text>
      ),
      width: 250,
    },
    {
      name: 'state',
      label: (
        <TableFilter
          label={t('header.state')}
          isActive={!!value.state}
          filter={
            <TableSelect
              value={value.state}
              placeholder={t('controls.find')}
              isLoading={isLoading.state}
              onChange={(val) => onChange.state(val as ISelectOption)}
              options={options.state?.map(({ label, value }) => {
                return {
                  value,
                  label,
                };
              })}
            />
          }
        />
      ),
    },
    {
      name: 'lastData',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.lastData')}
        </Text>
      ),
    },
    {
      name: 'lastUpdate',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.lastUpdate')}
        </Text>
      ),
    },
    {
      name: 'voltage',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.voltage')}
        </Text>
      ),
    },
    {
      name: 'chargingStatus',
      label: (
        <TableFilter
          label={t('header.chargingStatus')}
          isActive={!!value.chargingStatus}
          popupPosition={{ left: 'calc(-100% - 20px)' }}
          filter={
            <TableSelect
              value={value.chargingStatus}
              isLoading={isLoading.chargingStatus}
              placeholder={t('controls.find')}
              onChange={(val) => onChange.chargingStatus(val as ISelectOption)}
              options={options.chargingStatus?.map(({ label, value }) => {
                return {
                  value,
                  label,
                };
              })}
            />
          }
        />
      ),
      width: 170,
    },
    {
      name: 'controls',
      width: 52,
    },
  ];
};
