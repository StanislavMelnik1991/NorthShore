import classNames from 'classnames';
import { ISelectOption, StyledSelect } from '../..';
import { useAddressSelect } from '../hook';
import styles from './AddressSelect.module.scss';

interface AddressWrapper<T> {
  street: T;
  building: T;
  entrance: T;
  apartment?: T;
}

interface Props {
  className?: string;
  showLabel?: boolean;
  showApartment?: boolean;
  showEntries?: boolean;
  options: AddressWrapper<Array<ISelectOption>>;
  values: AddressWrapper<ISelectOption | null>;
  onChange: AddressWrapper<(val: unknown) => void>;
  loading: AddressWrapper<boolean>;
  errors?: Partial<AddressWrapper<string>>;
  disabled?: Partial<AddressWrapper<boolean>>;
}

export const AddressSelect = ({
  className,
  showLabel,
  errors,
  loading,
  onChange,
  options,
  values,
  showApartment,
  disabled,
  showEntries = true,
}: Props) => {
  const { t } = useAddressSelect();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <StyledSelect
        isDisabled={disabled?.street}
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
        isDisabled={disabled?.apartment || !options.building.length}
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
      {showEntries && (
        <StyledSelect
          className={classNames(styles.select, styles.entrance)}
          isDisabled={disabled?.entrance || !options.entrance.length}
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
      )}
      {showApartment && (
        <StyledSelect
          className={classNames(styles.select, styles.entrance)}
          isDisabled={disabled?.apartment || !options.apartment?.length}
          isLoading={loading.apartment}
          error={errors?.apartment}
          value={values.apartment}
          label={showLabel ? t('editor.apartment.label') : undefined}
          placeholder={t('editor.apartment.placeholder')}
          onChange={onChange.apartment}
          options={options.apartment?.map(({ label, value }) => {
            return {
              value,
              label,
            };
          })}
        />
      )}
    </div>
  );
};
