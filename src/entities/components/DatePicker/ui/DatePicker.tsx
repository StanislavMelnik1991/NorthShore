import classNames from 'classnames';
import { ru } from 'date-fns/locale/ru';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { IconCalendar } from '@shared/icons';
import styles from './DatePicker.module.scss';
registerLocale('ru', ru);

interface Props {
  className?: string;
  wrapperClassName?: string;
  value: Date | null;
  setDate(val: Date | null): void;
  label?: string;
  error?: string;
  required?: boolean;
  showTimeSelect?: boolean;
  timeFormat?: string;
  dateFormat?: string;
}

export const CustomDatePicker = ({
  className,
  wrapperClassName,
  setDate,
  value,
  error,
  label,
  required,
  showTimeSelect = true,
  timeFormat = 'HH:mm',
  dateFormat = 'dd MM yyyy, HH:mm',
}: Props) => {
  const { i18n } = useTranslation();
  return (
    <label className={classNames(styles.wrapper, wrapperClassName)}>
      {label && (
        <p className={classNames(styles.label, { [styles.error]: !!error })}>
          {label}
        </p>
      )}
      <div
        className={classNames(styles.border, {
          [styles.error]: !!error,
        })}
      >
        <DatePicker
          wrapperClassName={classNames(styles.wrapper, className)}
          showIcon
          required={required}
          locale={i18n.language}
          timeFormat={timeFormat}
          dateFormat={dateFormat}
          selected={value}
          showTimeSelect={showTimeSelect}
          icon={<IconCalendar width={20} height={20} />}
          onChange={(date) => setDate(date)}
        />
      </div>
      {error && (
        <p className={classNames(styles.error, styles.label, styles.errorText)}>
          {error}
        </p>
      )}
    </label>
  );
};
