import classNames from 'classnames';
import Select from 'react-select';
import { Props as SelectProps } from 'react-select';
import styles from './Select.module.scss';

export interface ISelectOption {
  value: number;
  label: string;
}

interface Props extends SelectProps {
  label?: string;
  error?: string;
  className?: string;
}

export const StyledSelect = ({
  label,
  inputId = 'select-input',
  error,
  isClearable = true,
  className,
  ...props
}: Props) => {
  return (
    <form className={classNames(styles.wrapper, className)}>
      {label && (
        <label
          className={classNames(styles.label, { [styles.error]: !!error })}
          id={props['aria-labelledby']}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <Select
        classNames={{
          control: (state) => {
            if (state.isFocused) {
              return styles.containerFocused;
            }
            return styles.container;
          },
          option: (state) => {
            if (state.isSelected) {
              return styles.optionSelected;
            }
            if (state.isFocused) {
              return styles.optionFocused;
            }
            return styles.option;
          },
          menu: () => styles.menu,
          input: () => styles.input,
          multiValue: () => styles.multiValue,
        }}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            font: 'inherit',
            color: error ? 'var(--red-100) !important' : 'inherit',
            borderColor: error ? 'var(--red-100) !important' : 'inherit',
          }),
        }}
        aria-labelledby={props['aria-labelledby']}
        inputId={inputId}
        isClearable={isClearable}
        {...props}
      />
      {error && (
        <p className={classNames(styles.error, styles.label, styles.errorText)}>
          {error}
        </p>
      )}
    </form>
  );
};
