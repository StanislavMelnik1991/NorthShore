import classNames from 'classnames';
import { IconPlusRounded } from '@shared/icons';
import { Button, TextField } from '@shared/ui';
import { useEditor } from '../hook';
import styles from './PhoneNumbers.module.scss';

interface Props {
  className?: string;
  values: Array<string>;
  onChange: (val: Array<string>) => void;
  label: string;
  placeholder: string;
}

export const PhoneNumbersEditor = ({
  className,
  onChange,
  values,
  label,
  placeholder,
}: Props) => {
  const { handleChangeValue, handleAddValue, t, iterableValues } = useEditor({
    onChange,
    values,
  });
  return (
    <div className={classNames(styles.wrapper, className)}>
      {iterableValues.map((el, index) => {
        return (
          <TextField
            value={el}
            wrapperClassName={styles.element}
            onChange={(ev) => {
              handleChangeValue(index)(ev.target.value);
            }}
            label={`${label} №${index + 1}`}
            placeholder={placeholder}
            key={`PhoneNumbersEditor-${index}`}
          />
        );
      })}
      <Button
        variant="text"
        onClick={handleAddValue}
        className={classNames(styles.element, styles.button)}
        disabled={iterableValues[iterableValues.length - 1] === ''}
      >
        <IconPlusRounded />
        {t('controls.addPhone')}
      </Button>
    </div>
  );
};
