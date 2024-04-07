import classNames from "classnames";
import { FocusEventHandler, useRef } from "react";
import ReactQuill from "react-quill";
import { useQuillEditor } from "./hooks/quillEditor";
import styles from "./QuillEditor.module.scss";
import "./hooks/helpers/block";

type Props = {
  initialValue: string;
  setValue: (val: string) => void;
  placeholder?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  theme?: "snow" | "bubble";
  focused?: boolean;
  uploadImage: (
    image: string | ArrayBuffer | Array<string | ArrayBuffer>,
  ) => Promise<{ url: string }[]>;
  showSpinner: () => void;
  hideSpinner: () => void;
  label?: string;
  error?: string;
};

export const QuillEditor = ({
  placeholder,
  initialValue,
  onBlur,
  theme = "snow",
  setValue,
  focused = false,
  hideSpinner,
  showSpinner,
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
    wrapperRef,
    isActive: focused,
    hideSpinner,
    showSpinner,
    uploadImage,
  });

  const MODULES = {
    toolbar: [
      [{ header: [2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const FORMATS = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "embedVideo",
    "align",
  ];

  return (
    <label
      className={classNames(styles.wrapper, wrapperClassName)}
      ref={wrapperRef}
      onClick={handleLabelClick}
    >
      {label && (
        <p className={classNames(styles.label, { [styles.error]: !!error })}>
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
          modules={MODULES}
          formats={FORMATS}
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
