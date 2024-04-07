import classNames from "classnames";
import { FocusEventHandler, RefObject, useRef } from "react";
import ReactQuill from "react-quill";
import { useQuillEditor } from "./hooks/quillEditor";
import styles from "./QuillEditor.module.scss";
import "./hooks/helpers/block";

type Props = {
  initialValue: string;
  setValue: (val: string) => void;
  placeholder?: string;
  className?: string;
  quillClassName?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  theme?: "snow" | "bubble";
  focused?: boolean;
  scrollingRef?: RefObject<HTMLDivElement>;
  uploadImage: (
    image: string | ArrayBuffer | Array<string | ArrayBuffer>,
  ) => Promise<{ url: string }[]>;
  showSpinner: () => void;
  hideSpinner: () => void;
};

export const QuillEditor = ({
  placeholder,
  initialValue,
  className,
  onBlur,
  quillClassName,
  theme = "snow",
  setValue,
  focused = false,
  scrollingRef,
  hideSpinner,
  showSpinner,
  uploadImage,
}: Props) => {
  const reactQuillRef = useRef<ReactQuill>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { onChange, value } = useQuillEditor({
    reactQuillRef,
    value: initialValue,
    setValue,
    wrapperRef,
    isActive: focused,
    scrollingRef,
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
  ];

  return (
    <div className={classNames(styles.wrapper, className)} ref={wrapperRef}>
      <ReactQuill
        theme={theme}
        className={classNames(styles.quill, quillClassName)}
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
  );
};
