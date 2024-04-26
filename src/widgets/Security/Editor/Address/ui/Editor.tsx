import { FormikErrors } from 'formik';
import { AddressFilters } from '@features/address';
import { ISelectOption } from '@entities/components';
import { TextField, Title } from '@shared/ui';
import { StyledTextAria } from '@shared/ui/TextAria';
import { useSecurityAddressEditor } from '../hook';
import styles from './Editor.module.scss';

type Data = {
  address_building_id?: number;
  address_entrance_id?: number;
  address_street_id?: number;
  comment?: string;
  point?: string;
  name?: string;
};

interface Props {
  title?: string;
  values: Data;
  errors: FormikErrors<Data>;
  initialAddress?: {
    street?: ISelectOption;
    building?: ISelectOption;
    entrance?: ISelectOption;
  };
  setFieldValue: (
    field: keyof Data,
    value: string | Date | null | undefined | number,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Data>>;
}

export const SecurityAddressEditor = ({
  values,
  setFieldValue,
  errors,
  title,
  initialAddress,
}: Props) => {
  const { t, handleChangeSelection } = useSecurityAddressEditor({
    setFieldValue,
  });
  return (
    <div className={styles.wrapper}>
      <Title fontWeight="semibold" className={styles.title}>
        {title}
      </Title>
      <AddressFilters
        errors={{
          building: errors.address_building_id,
          entrance: errors.address_entrance_id,
          street: errors.address_street_id,
        }}
        initialValues={initialAddress}
        showLabel
        setFilters={handleChangeSelection}
      />
      <StyledTextAria
        inputClassName={styles.comment}
        label={t('editor.placeComment.label')}
        placeholder={t('editor.placeComment.placeholder')}
        error={errors.comment}
        value={values.comment}
        onChange={(ev) => {
          setFieldValue('name', ev.target.value);
          setFieldValue('comment', ev.target.value);
        }}
      />
      <TextField
        label={t('editor.point.label')}
        placeholder={t('editor.point.placeholder')}
        error={errors.point}
        value={values.point}
        onChange={(ev) => setFieldValue('point', ev.target.value)}
      />
    </div>
  );
};
