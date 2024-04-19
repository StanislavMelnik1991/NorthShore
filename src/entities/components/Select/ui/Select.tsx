import classNames from 'classnames';
import Select from 'react-select';
import { Props as SelectProps } from 'react-select';
import styles from './Select.module.scss';

interface Props extends SelectProps {
  label?: string;
  error?: string;
}

export const StyledSelect = ({
  label,
  inputId = 'select-input',
  error,
  isClearable = true,
  ...props
}: Props) => {
  return (
    <form className={styles.wrapper}>
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
          menu: () => {
            return styles.menu;
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
