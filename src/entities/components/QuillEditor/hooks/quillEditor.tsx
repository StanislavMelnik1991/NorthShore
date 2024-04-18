import { useCallback, useEffect, useRef } from 'react';
import type ReactQuill from 'react-quill';
import type { ReactQuillProps } from 'react-quill';
import { insertImage, insertLink } from './helpers';
import './helpers/block';

type CustomFile = {
  id: number;
  url: string;
};

type Props = {
  value: string;
  setValue: (val: string) => void;
  isActive: boolean;
  uploadImage(file: File): Promise<CustomFile | undefined>;
};

export const useQuillEditor = ({
  value,
  setValue,
  isActive,
  uploadImage,
}: Props) => {
  const reactQuillRef = useRef<ReactQuill>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onchangeHandler: ReactQuillProps['onChange'] = (
    value,
    delta,
    source,
    editor,
  ) => {
    if (source === 'user' && delta.ops && delta.ops.length) {
      if (!reactQuillRef.current) {
        return;
      }
      const contentEditor = reactQuillRef.current.getEditor();
      const data = delta.ops[delta.ops.length - 1];
      console.log(data);
      if (data && contentEditor) {
        const content = data.insert;
        const contentText = editor.getText();
        const position = contentText.indexOf(content as string) || 0;
        if (content?.image) {
          const file = dataURLtoFile(content.image);
          uploadImage(file).then((newFile) => {
            (
              contentEditor as unknown as { history: { undo: () => void } }
            ).history.undo();
            if (!newFile) {
              return;
            }
            insertImage(contentEditor, newFile.url);
          });
          return;
        }
        if (typeof content === 'string' && content?.startsWith('https://')) {
          (
            contentEditor as unknown as { history: { undo: () => void } }
          ).history.undo();
          contentEditor.insertText(position, '\n');
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

  function dataURLtoFile(dataUrl: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'Image', { type: mime });
  }

  const onDrop = useCallback(
    async (files: File[]) => {
      if (reactQuillRef.current && files.length) {
        const editor = reactQuillRef.current.getEditor();
        editor.focus();
        const newFile = await uploadImage(files[0]);
        if (newFile) {
          insertImage(editor, newFile.url);
        }
      }
    },
    [reactQuillRef, uploadImage],
  );

  const handlePasteContent = useCallback(
    (ev: ClipboardEvent) => {
      if (!reactQuillRef.current || !ev.clipboardData) {
        return;
      }
      if (ev.clipboardData.items.length) {
        const item = ev.clipboardData.items[0];
        if (item.type.indexOf('image') === 0 || item.type === 'text/html') {
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
        'paste',
        handlePasteContent as EventListener,
      );
      return () => {
        contentElement?.removeEventListener(
          'paste',
          handlePasteContent as EventListener,
        );
      };
    }
  }, [handlePasteContent, wrapperRef]);

  const handleLabelClick: React.MouseEventHandler = useCallback(
    (ev) => {
      ev.stopPropagation();
      if (reactQuillRef && reactQuillRef.current) {
        reactQuillRef.current.focus();
      }
    },
    [reactQuillRef],
  );

  return {
    onChange: onchangeHandler,
    value,
    handleLabelClick,
    reactQuillRef,
    wrapperRef,
  };
};
