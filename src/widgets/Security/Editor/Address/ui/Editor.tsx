import { FormikErrors } from 'formik';
import { useTranslation } from 'react-i18next';
import { AddressFilters } from '@features/address';
import { TextField, Title } from '@shared/ui';
import { StyledTextAria } from '@shared/ui/TextAria';
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
}: Props) => {
  const { t } = useTranslation('security');
  return (
    <div className={styles.wrapper}>
      <Title fontWeight="semibold" className={styles.title}>
        {title}
      </Title>
      <AddressFilters
        showLabel
        setFilters={({ building_id, entrance_id, street_id }) => {
          setFieldValue('address_building_id', building_id);
          setFieldValue('address_entrance_id', entrance_id);
          setFieldValue('address_street_id', street_id);
        }}
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
