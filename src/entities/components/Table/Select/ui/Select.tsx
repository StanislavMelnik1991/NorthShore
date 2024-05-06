import Select from 'react-select';
import { Props as SelectProps } from 'react-select';
import styles from './Select.module.scss';

interface Props extends SelectProps {}

export const TableSelect = ({
  inputId = 'select-input',
  isClearable = true,
  ...props
}: Props) => {
  return (
    <form className={styles.wrapper}>
      <Select
        menuIsOpen
        classNames={{
          indicatorsContainer: () => {
            return styles.indicators;
          },
          valueContainer: () => {
            return styles.valueContainer;
          },
          control: () => {
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
          input: () => {
            return styles.input;
          },
          placeholder: () => {
            return styles.placeholder;
          },
        }}
        aria-labelledby={props['aria-labelledby']}
        inputId={inputId}
        isClearable={isClearable}
        {...props}
      />
    </form>
  );
};
