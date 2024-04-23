import classNames from 'classnames';
import { FormikErrors } from 'formik';
import { Cover, QuillEditor, StyledSelect } from '@entities/components';
import { IFile } from '@entities/types';
import { RequestThemesEnum } from '@shared/constants';
import { IconStaple } from '@shared/icons';
import { Button, Card, TextField } from '@shared/ui';
import { useEditorWidget } from '../hook';
import styles from './Editor.module.scss';

type Values = {
  title: string;
  content: string;
  theme_id: keyof typeof RequestThemesEnum;
  contact_fio: string;
  contact_phone: string;
  files: IFile[];
};

interface Props {
  className?: string;
  loading?: boolean;
  handleUploadImage(file: File): Promise<IFile | undefined>;
  controls?: JSX.Element;
  values: Values;
  errors: FormikErrors<Values>;
  setFieldValue: (
    field: keyof Values,
    value: string | Array<IFile> | number | null | undefined,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Values>>;
}

export const RequestContentEditor = ({
  className,
  handleUploadImage,
  controls,
  errors,
  setFieldValue,
  loading,
  values,
}: Props) => {
  const { getInputProps, open, t, isLoading, handleRemoveImage } =
    useEditorWidget({
      handleUploadImage,
      files: values.files,
      setFieldValue,
    });
  return (
    <Card
      loading={loading}
      className={classNames(styles.wrapper, className)}
      radius={24}
      flexDirection="column"
      gap={20}
    >
      <input {...getInputProps()} />
      {Object.keys(values).includes('theme_id') && (
        <StyledSelect
          label={t('editor.theme.label')}
          placeholder={t('editor.theme.placeholder')}
          defaultValue={values.theme_id}
          onChange={(val) => {
            if (val) {
              setFieldValue(
                'theme_id',
                Number((val as { value: number; label: string }).value),
              );
            } else {
              setFieldValue('theme_id', null);
            }
          }}
          options={Object.entries(RequestThemesEnum).map(([value, label]) => {
            return {
              value,
              label: t(`themes.${label}`),
            };
          })}
        />
      )}

      {Object.keys(values).includes('title') && (
        <TextField
          value={values.title}
          error={errors.title}
          onChange={(ev) => setFieldValue('title', ev.target.value)}
          wrapperClassName={styles.textField}
          label={t('editor.title.label')}
          placeholder={t('editor.title.placeholder')}
        />
      )}
      {Object.keys(values).includes('content') && (
        <QuillEditor
          error={errors.content}
          label={t('editor.content.label')}
          initialValue={values.content || ''}
          setValue={(val) => setFieldValue('content', val)}
          uploadImage={handleUploadImage}
        />
      )}
      {Object.keys(values).includes('files') && (
        <>
          <Button
            variant={'light'}
            className={styles.downloadButton}
            type="button"
            onClick={open}
            loading={isLoading}
          >
            <IconStaple width={24} height={24} />
            {t('editor.cover.label')}
          </Button>
          {!!values.files.length && (
            <div className={styles.images}>
              {values.files.map((el, index) => {
                return (
                  <Cover
                    key={`file-${index}`}
                    src={el.url}
                    onRemove={() => handleRemoveImage(index)}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
      {Object.keys(values).includes('contact_fio') && (
        <TextField
          value={values.contact_fio}
          error={errors.contact_fio}
          onChange={(ev) => setFieldValue('contact_fio', ev.target.value)}
          wrapperClassName={styles.textField}
          label={t('editor.contact_fio.label')}
          placeholder={t('editor.contact_fio.placeholder')}
        />
      )}

      {Object.keys(values).includes('contact_phone') && (
        <TextField
          value={values.contact_phone}
          error={errors.contact_phone}
          onChange={(ev) => setFieldValue('contact_phone', ev.target.value)}
          wrapperClassName={styles.textField}
          label={t('editor.contact_phone.label')}
          placeholder={t('editor.contact_phone.placeholder')}
        />
      )}
      {controls || ''}
    </Card>
  );
};
