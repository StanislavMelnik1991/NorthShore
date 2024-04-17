import classNames from 'classnames';
import { FocusEventHandler, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useQuillEditor } from '../../hooks';
import styles from './QuillEditor.module.scss';

type Props = {
  initialValue: string;
  setValue: (val: string) => void;
  placeholder?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  theme?: 'snow' | 'bubble';
  focused?: boolean;
  label?: string;
  error?: string;
  uploadImage(file: File): Promise<string | undefined>;
};

export const QuillEditor = ({
  placeholder,
  initialValue,
  onBlur,
  theme = 'snow',
  setValue,
  focused = false,
  uploadImage,
  error,
  label,
  inputClassName,
  wrapperClassName,
}: Props) => {
  const reactQuillRef = useRef<ReactQuill>(null);
  const wrapperRef = useRef<HTMLLabelElement>(null);

  const { onChange, value, handleLabelClick } = useQuillEditor({
    reactQuillRef,
    value: initialValue,
    setValue,
    isActive: focused,
    wrapperRef,
    uploadImage,
  });

  const modules = {
    toolbar: [
      [{ header: [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'embedVideo',
    'align',
  ];

  return (
    <label
      className={classNames(styles.wrapper, wrapperClassName)}
      ref={wrapperRef}
    >
      {label && (
        <p
          className={classNames(styles.label, { [styles.error]: !!error })}
          onClick={handleLabelClick}
        >
          {label}
        </p>
      )}
      <div
        className={classNames(styles.border, {
          [styles.error]: !!error,
        })}
      >
        <ReactQuill
          theme={theme}
          className={classNames(styles.quill, inputClassName)}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          modules={modules}
          formats={formats}
          preserveWhitespace
          onBlur={() => onBlur}
          ref={reactQuillRef}
        />
      </div>
      {error && (
        <p className={classNames(styles.error, styles.label)}>{error}</p>
      )}
    </label>
  );
};
