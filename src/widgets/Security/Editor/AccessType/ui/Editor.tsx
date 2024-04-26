import { FormikErrors } from 'formik';
import { ISelectOption, StyledSelect } from '@entities/components';
import { TextField } from '@shared/ui';
import { useAccessTypeEditor } from '../hook';
import styles from './Editor.module.scss';

type Data = {
  type: ISelectOption | null;
  ip_address?: string;
  type_id?: number;
};

interface Props {
  values: Data;
  errors: FormikErrors<Data>;
  setFieldValue: (
    field: keyof Data,
    value: string | ISelectOption | null | undefined,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Data>>;
}

export const SecurityAccessTypeEditor = ({
  values,
  setFieldValue,
  errors,
}: Props) => {
  const { t, data, isLoading, handleChangeSelection } = useAccessTypeEditor({
    setFieldValue,
  });
  return (
    <div className={styles.wrapper}>
      <StyledSelect
        label={t('editor.accessType.label')}
        placeholder={t('editor.accessType.placeholder')}
        isLoading={isLoading}
        options={data}
        value={values.type}
        error={errors.type_id}
        onChange={handleChangeSelection}
      />
      <TextField
        wrapperClassName={styles.editor}
        label={t('editor.ipAddress.label')}
        placeholder={t('editor.ipAddress.placeholder')}
        error={errors.ip_address}
        value={values.ip_address}
        onChange={(ev) => setFieldValue('ip_address', ev.target.value)}
      />
    </div>
  );
};
