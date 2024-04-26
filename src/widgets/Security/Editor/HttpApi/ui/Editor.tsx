import { FormikErrors } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextField, Title } from '@shared/ui';
import styles from './Editor.module.scss';

type Data = {
  http_login?: string;
  http_password?: string;
};

interface Props {
  title?: string;
  values: Data;
  errors: FormikErrors<Data>;
  setFieldValue: (
    field: keyof Data,
    value: string | undefined,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Data>>;
}

export const SecurityHttpApiEditor = ({
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

      <TextField
        label={t('editor.login.label')}
        placeholder={t('editor.login.placeholder')}
        error={errors.http_login}
        value={values.http_login}
        onChange={(ev) => setFieldValue('http_login', ev.target.value)}
      />
      <TextField
        label={t('editor.password.label')}
        placeholder={t('editor.password.placeholder')}
        error={errors.http_password}
        value={values.http_password}
        onChange={(ev) => setFieldValue('http_password', ev.target.value)}
      />
    </div>
  );
};
