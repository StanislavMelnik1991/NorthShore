import { FormikErrors } from 'formik';
import { AddressFilters } from '@features/address';
import { ISelectOption } from '@entities/components';
import { TextField } from '@shared/ui';
import { useSlsIntercomEditor } from '../hook';
import styles from './Editor.module.scss';

type Data = {
  uuid?: string;
  apartment_id?: number | string;
};

interface Props {
  values: Data;
  errors: FormikErrors<Data>;
  initialAddress?: {
    street?: ISelectOption;
    building?: ISelectOption;
    entrance?: ISelectOption;
    apartment?: ISelectOption;
  };
  setFieldValue: (
    field: keyof Data,
    value: string | null | undefined | number,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Data>>;
}

export const SlsIntercomEditor = ({
  values,
  setFieldValue,
  errors,
  initialAddress,
}: Props) => {
  const { t, handleChangeSelection } = useSlsIntercomEditor({
    setFieldValue,
  });
  return (
    <div className={styles.wrapper}>
      <TextField
        label={t('editor.uuid.label')}
        placeholder={t('editor.uuid.placeholder')}
        error={errors.uuid}
        value={values.uuid}
        onChange={(ev) => setFieldValue('uuid', ev.target.value)}
      />
      <AddressFilters
        className={styles.address}
        showApartment
        errors={{
          apartment: errors.apartment_id,
        }}
        initialValues={initialAddress}
        showLabel
        setFilters={handleChangeSelection}
      />
    </div>
  );
};
