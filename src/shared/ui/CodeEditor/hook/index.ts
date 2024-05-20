import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  onChange: (val: string) => void;
  characterCount: number;
  value?: string;
}

export const useCodeEditor = ({ onChange, value, characterCount }: Props) => {
  const inputArr = Array.from(
    { length: characterCount },
    (v, index) => value?.[index] || '',
  );
  const [values, setValues] = useState<Array<string>>(inputArr);
  const inputListWrapperRef = useRef<HTMLDivElement>(null);

  const handleChangeValue = useCallback(
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const lastSymbol = value[value.length - 1];
      const newValues = [...values];
      newValues[index] = lastSymbol;
      setValues(newValues);
      const renderValues = newValues.map((el) => el || '');
      onChange(renderValues.join(''));

      if (index < values.length - 1) {
        const nextInput = event.target.nextSibling;
        if (nextInput instanceof HTMLInputElement) {
          nextInput.focus();
        }
      }
    },
    [onChange, values],
  );

  const handlePasteContent = useCallback(
    (ev: ClipboardEvent) => {
      if (inputListWrapperRef.current) {
        const clipboardData = ev.clipboardData;
        const pastedText = clipboardData?.getData('text');
        if (pastedText) {
          const pastedValues = pastedText.trim();
          const newValues = inputArr.map(
            (el, index) => pastedValues[index] || '',
          );
          if (pastedValues && pastedValues.length) {
            ev.stopPropagation();
            ev.preventDefault();
            onChange(newValues.join(''));
            setValues(newValues);
            const inputList = inputListWrapperRef.current.children;
            const actualIndex =
              pastedValues.length === inputArr.length
                ? pastedValues.length - 1
                : pastedValues.length;
            const nextInput = inputList[actualIndex];
            if (nextInput instanceof HTMLInputElement) {
              nextInput.focus();
            }
          }
        }
      }
    },
    [inputArr, onChange],
  );

  useEffect(() => {
    if (inputListWrapperRef && inputListWrapperRef.current) {
      const contentElement = inputListWrapperRef.current;
      contentElement.addEventListener('paste', handlePasteContent);
      return () => {
        contentElement?.removeEventListener('paste', handlePasteContent);
      };
    }
  }, [handlePasteContent]);

  return { inputArr, handleChangeValue, values, inputListWrapperRef };
};
