import { DeltaStatic, Sources } from "quill";
import { useState, useCallback, KeyboardEventHandler, useEffect } from "react";
import { RefObject } from "react";
import type ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { insertImage, insertLink } from "./helpers";

type Props = {
  reactQuillRef: RefObject<ReactQuill>;
  wrapperRef: RefObject<HTMLDivElement>;
  value: string;
  setValue: (val: string) => void;
  isActive: boolean;
  scrollingRef?: RefObject<HTMLDivElement>;
  uploadImage: (
    image: string | ArrayBuffer | Array<string | ArrayBuffer>,
  ) => Promise<{ url: string }[]>;
  showSpinner: () => void;
  hideSpinner: () => void;
};

export const useQuillEditor = ({
  reactQuillRef,
  value,
  setValue,
  isActive,
  wrapperRef,
  scrollingRef,
  hideSpinner,
  showSpinner,
  uploadImage,
}: Props) => {
  const [sideBarTop, setSideBarTop] = useState(16);
  const [showSideToolbar, setShowSideToolbar] = useState(false);

  const onchangeHandler = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor,
  ) => {
    // console.log('source', source)
    // console.log('value', value)
    // console.log('delta', delta)
    if (source === "user" && delta.ops && delta.ops.length) {
      if (!reactQuillRef.current) {
        return;
      }
      const contentEditor = reactQuillRef.current.getEditor();
      const data = delta.ops[delta.ops.length - 1];
      if (data && contentEditor) {
        const text = data.insert as string;
        const contentText = editor.getText();
        const position = contentText.indexOf(text) || 0;
        if (text?.startsWith("https://")) {
          (
            contentEditor as unknown as { history: { undo: () => void } }
          ).history.undo();
          contentEditor.insertText(position, "\n");
          setShowSideToolbar(true);
          insertLink(contentEditor, text, position);
          return;
        } else {
          setValue(value);
          return;
        }
      }
    }
    setValue(value);
  };

  const onChangeSelectionHandler = (
    selection: ReactQuill.Range,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor,
  ) => {
    handleShowSideToolbar(editor);
  };

  const handleShowSideToolbar = (editor: ReactQuill.UnprivilegedEditor) => {
    const range = editor.getSelection();
    if (range) {
      const { top } = editor.getBounds(range.index);
      scrollToContentHand(top);
      setSideBarTop(top);
    }
  };

  const scrollToContentHand = (contentTop: number) => {
    if (!scrollingRef || !scrollingRef.current) {
      return;
    }
    const { scrollTop, clientHeight } = scrollingRef.current;
    if (scrollTop > contentTop || scrollTop + clientHeight < contentTop) {
      scrollingRef.current.scrollTo({ top: contentTop, behavior: "smooth" });
    }
  };

  const addEmojiHandler = useCallback(
    (val: string) => {
      if (!reactQuillRef.current) {
        return;
      }
      const editor = reactQuillRef.current.getEditor();
      const cursorPosition = editor.getSelection(true)?.index || 0;
      editor.insertText(cursorPosition, val, "silent");
    },
    [reactQuillRef],
  );

  const onDrop = useCallback(
    async (files: File[]) => {
      showSpinner();
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
            const { url } = (await uploadImage(reader.result as string))[0];
            insertImage(editor, url);
          } catch (error) {
            toast.error("error");
            console.error(error);
          }
        };
        hideSpinner();
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

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (ev) => {
    if (ev.code === "Enter") {
      setShowSideToolbar(true);
    } else {
      setShowSideToolbar(false);
    }
  };
  const onFocus = () => {
    setShowSideToolbar(true);
  };

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

  return {
    sideBarTop,
    addEmojiHandler,
    onDrop,
    onChange: onchangeHandler,
    onChangeSelection: onChangeSelectionHandler,
    value,
    showSideToolbar,
    onKeyDown,
    onFocus,
    handlePasteContent,
  };
};
