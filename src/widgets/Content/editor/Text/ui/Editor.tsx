import classNames from 'classnames';
import { QuillEditor } from '@entities/components';
import { StyledTextAria, TextField, Title } from '@shared/ui';
import styles from './Editor.module.scss';

type Variants = 'quill' | 'textarea';

type Editor = {
  label?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange: (val: string) => void | Promise<void>;
};

type CustomFile = {
  id: number;
  url: string;
};

interface Props {
  className?: string;
  title?: string;
  variant?: Variants;
  titleEditor?: Editor;
  contentEditor?: Editor;
  uploadImage?: (file: File) => Promise<CustomFile | undefined>;
}

export const TextContentEditor = ({
  className,
  contentEditor,
  title,
  titleEditor,
  variant = 'quill',
  uploadImage,
}: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      {title && (
        <Title fontWeight="bold" variant="h2">
          {title}
        </Title>
      )}
      {titleEditor && (
        <TextField
          value={titleEditor.value}
          error={titleEditor.error}
          onChange={(ev) => {
            titleEditor.onChange(ev.target.value);
          }}
          wrapperClassName={styles.textField}
          label={titleEditor.label}
          placeholder={titleEditor.placeholder}
        />
      )}
      {variant === 'quill' && contentEditor && (
        <QuillEditor
          error={contentEditor.error}
          label={contentEditor.label}
          initialValue={contentEditor.value || ''}
          setValue={(val) => {
            contentEditor.onChange(val);
          }}
          uploadImage={uploadImage}
          placeholder={contentEditor.placeholder}
        />
      )}
      {variant === 'textarea' && contentEditor && (
        <StyledTextAria
          error={contentEditor.error}
          label={contentEditor.label}
          value={contentEditor.value}
          onChange={(ev) => {
            contentEditor.onChange(ev.target.value);
          }}
          placeholder={contentEditor.placeholder}
        />
      )}
    </div>
  );
};
