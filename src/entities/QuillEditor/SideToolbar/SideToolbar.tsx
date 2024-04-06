import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { GalleryAddIcon } from "./icons/GalleryAddIcon";
import styles from "./SideToolbar.module.scss";

type Props = {
  top: number;
  onAddImage: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void;
};

export function SideToolbar({ top, onAddImage }: Props) {
  const acceptedFileTypes = {
    "image/png": [".png"],
    "image/jpg": [".jpg"],
    "image/jpeg": [".jpeg"],
  };

  const { getInputProps, open } = useDropzone({
    onDrop: onAddImage,
    noClick: true,
    maxFiles: 1,
    accept: acceptedFileTypes,
  });

  return (
    <div
      id="toolbar"
      className={styles["side-toolbar"]}
      style={{ top: top - 2 }}
    >
      <input {...getInputProps()} />
      <button className={styles["side-toolbar-btn"]} onClick={open}>
        <GalleryAddIcon />
      </button>
    </div>
  );
}
