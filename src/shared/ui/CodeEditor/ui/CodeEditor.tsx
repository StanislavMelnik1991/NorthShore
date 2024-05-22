import classNames from 'classnames';
import { type DetailedHTMLProps, type InputHTMLAttributes } from 'react';
import { useCodeEditor } from '../hook';
import styles from './CodeEditor.module.scss';

type PrototypeProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'placeholder' | 'className' | 'onChange' | 'value'
>;

interface Props extends PrototypeProps {
  wrapperClassName?: string;
  inputClassName?: string;
  label?: string;
  error?: string;
  onChange: (val: string) => void;
  characterCount?: number;
  value?: string;
}

export const CodeEditor = ({
  wrapperClassName,
  inputClassName,
  error,
  label,
  characterCount = 4,
  onChange,
  value,
  ...props
}: Props) => {
  const { inputArr, handleChangeValue, values, inputListWrapperRef } =
    useCodeEditor({
      characterCount,
      onChange,
      value,
    });
  return (
    <label className={classNames(styles.wrapper, wrapperClassName)}>
      {label && (
        <p className={classNames(styles.label, { [styles.error]: !!error })}>
          {label}
        </p>
      )}
      <div className={styles.inputList} ref={inputListWrapperRef}>
        {inputArr.map((el, index) => {
          return (
            <input
              key={`CodeEditor-input-${index}`}
              {...props}
              value={values[index]}
              onChange={handleChangeValue(index)}
              className={classNames(styles.input, inputClassName, {
                [styles.error]: !!error,
              })}
            />
          );
        })}
      </div>

      {error && (
        <p className={classNames(styles.error, styles.label, styles.errorText)}>
          {error}
        </p>
      )}
    </label>
  );
};
