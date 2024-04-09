import { useCallback, useEffect } from "react";
import { RefObject } from "react";
import type ReactQuill from "react-quill";
import type { ReactQuillProps } from "react-quill";
import { toast } from "react-toastify";
import { insertImage, insertLink } from "./helpers";

type Props = {
  reactQuillRef: RefObject<ReactQuill>;
  wrapperRef: RefObject<HTMLLabelElement>;
  value: string;
  setValue: (val: string) => void;
  isActive: boolean;
};

export const useQuillEditor = ({
  reactQuillRef,
  value,
  setValue,
  isActive,
  wrapperRef,
}: Props) => {
  const onchangeHandler: ReactQuillProps["onChange"] = (
    value,
    delta,
    source,
    editor,
  ) => {
    if (source === "user" && delta.ops && delta.ops.length) {
      if (!reactQuillRef.current) {
        return;
      }
      const contentEditor = reactQuillRef.current.getEditor();
      const data = delta.ops[delta.ops.length - 1];
      if (data && contentEditor) {
        const content = data.insert as string;
        const contentText = editor.getText();
        const position = contentText.indexOf(content as string) || 0;
        /* if ((content as unknown as { image: string })?.image) {
          uploadImage((content as unknown as { image: string }).image).then(
            ([{ url }]) => {
              (
                contentEditor as unknown as { history: { undo: () => void } }
              ).history.undo();
              contentEditor.insertText(position, "\n");
              insertLink(contentEditor, url, position);
            },
          );
          return;
        } */
        if (typeof content === "string" && content?.startsWith("https://")) {
          (
            contentEditor as unknown as { history: { undo: () => void } }
          ).history.undo();
          contentEditor.insertText(position, "\n");
          insertLink(contentEditor, content, position);
          return;
        } else {
          setValue(value);
          return;
        }
      }
    }
    setValue(value);
  };

  /* const addEmojiHandler = useCallback(
    (val: string) => {
      if (!reactQuillRef.current) {
        return;
      }
      const editor = reactQuillRef.current.getEditor();
      const cursorPosition = editor.getSelection(true)?.index || 0;
      editor.insertText(cursorPosition, val, "silent");
    },
    [reactQuillRef],
  ); */

  const onDrop = useCallback(
    async (files: File[]) => {
      if (files.length) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = async () => {
          try {
            if (!reactQuillRef.current) {
              return;
            }
            const editor = reactQuillRef.current.getEditor();
            editor.focus();
            // const { url } = (await uploadImage(reader.result as string))[0];
            insertImage(editor, reader.result as string);
          } catch (error) {
            toast.error("error");
            console.error(error);
          }
        };
      }
    },
    [reactQuillRef],
  );

  const handlePasteContent = useCallback(
    (ev: ClipboardEvent) => {
      if (!reactQuillRef.current || !ev.clipboardData) {
        return;
      }
      if (ev.clipboardData.items.length) {
        const item = ev.clipboardData.items[0];
        if (item.type.indexOf("image") === 0 || item.type === "text/html") {
          ev.preventDefault();
          const image = item.getAsFile();
          image && onDrop([image]);
        }
      }
    },
    [onDrop, reactQuillRef],
  );

  useEffect(() => {
    if (isActive && reactQuillRef && reactQuillRef.current) {
      reactQuillRef.current.focus();
    }
  }, [isActive, reactQuillRef]);

  useEffect(() => {
    if (wrapperRef && wrapperRef.current) {
      const contentElement = wrapperRef.current;
      contentElement.addEventListener(
        "paste",
        handlePasteContent as EventListener,
      );
      return () => {
        contentElement?.removeEventListener(
          "paste",
          handlePasteContent as EventListener,
        );
      };
    }
  }, [handlePasteContent, wrapperRef]);

  const handleLabelClick: React.MouseEventHandler<HTMLLabelElement> =
    useCallback(
      (ev) => {
        ev.stopPropagation();
        if (reactQuillRef && reactQuillRef.current) {
          reactQuillRef.current.focus();
        }
      },
      [reactQuillRef],
    );

  return {
    // onDrop,
    // handlePasteContent,
    onChange: onchangeHandler,
    value,
    handleLabelClick,
  };
};
