import classNames from 'classnames';
import { StyledSelect } from '../..';
import { useAddressSelect } from '../hook';
import styles from './AddressSelect.module.scss';

interface Options {
  value: string | number;
  label: string;
}

interface AddressWrapper<T> {
  street: T;
  building: T;
  entrance: T;
}

interface Props {
  className?: string;
  showLabel?: boolean;
  options: AddressWrapper<Array<Options>>;
  values: AddressWrapper<Options | null>;
  onChange: AddressWrapper<(val: unknown) => void>;
  loading: AddressWrapper<boolean>;
  errors?: Partial<AddressWrapper<string>>;
}

export const AddressSelect = ({
  className,
  showLabel,
  errors,
  loading,
  onChange,
  options,
  values,
}: Props) => {
  const { t } = useAddressSelect();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <StyledSelect
        className={classNames(styles.select, styles.street)}
        value={values.street}
        isLoading={loading.street}
        error={errors?.street}
        label={showLabel ? t('editor.street.label') : undefined}
        placeholder={t('editor.street.placeholder')}
        onChange={onChange.street}
        options={options.street.map(({ label, value }) => {
          return {
            value,
            label,
          };
        })}
      />
      <StyledSelect
        className={classNames(styles.select, styles.home)}
        isDisabled={!options.building.length}
        isLoading={loading.building}
        value={values.building}
        error={errors?.building}
        label={showLabel ? t('editor.building.label') : undefined}
        placeholder={t('editor.building.placeholder')}
        onChange={onChange.building}
        options={options.building.map(({ label, value }) => {
          return {
            value,
            label,
          };
        })}
      />
      <StyledSelect
        className={classNames(styles.select, styles.entrance)}
        isDisabled={!options.entrance.length}
        isLoading={loading.entrance}
        error={errors?.entrance}
        value={values.entrance}
        label={showLabel ? t('editor.entrance.label') : undefined}
        placeholder={t('editor.entrance.placeholder')}
        onChange={onChange.entrance}
        options={options.entrance.map(({ label, value }) => {
          return {
            value,
            label,
          };
        })}
      />
    </div>
  );
};
