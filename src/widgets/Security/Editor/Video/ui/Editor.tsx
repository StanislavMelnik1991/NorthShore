import { FormikErrors } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextField } from '@shared/ui';
import styles from './Editor.module.scss';

type Data = {
  rtsp_url?: string;
  rtsp_url_small?: string;
};

interface Props {
  values: Data;
  errors: FormikErrors<Data>;
  setFieldValue: (
    field: keyof Data,
    value: string | Date | null | undefined | number,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Data>>;
}

export const SecurityVideoEditor = ({
  values,
  setFieldValue,
  errors,
}: Props) => {
  const { t } = useTranslation('security');
  return (
    <div className={styles.wrapper}>
      {Object.keys(values).includes('rtsp_url') && (
        <TextField
          label={t('editor.highQuality.label')}
          placeholder={t('editor.highQuality.placeholder')}
          error={errors.rtsp_url}
          value={values.rtsp_url}
          onChange={(ev) => setFieldValue('rtsp_url', ev.target.value)}
        />
      )}
      {Object.keys(values).includes('rtsp_url_small') && (
        <TextField
          label={t('editor.lowQuality.label')}
          placeholder={t('editor.lowQuality.placeholder')}
          error={errors.rtsp_url_small}
          value={values.rtsp_url_small}
          onChange={(ev) => setFieldValue('rtsp_url_small', ev.target.value)}
        />
      )}
    </div>
  );
};
