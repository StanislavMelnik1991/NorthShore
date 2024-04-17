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
  startDate: Date | null;
  setStartDate(val: Date | null): void;
  label?: string;
  error?: string;
}

export const CustomDatePicker = ({
  className,
  setStartDate,
  startDate,
  error,
  label,
}: Props) => {
  const { i18n } = useTranslation();
  return (
    <label className={classNames(styles.wrapper)}>
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
          locale={i18n.language}
          timeFormat="HH:mm"
          dateFormat="dd MM yyyy, HH:mm"
          selected={startDate}
          showTimeSelect
          icon={<IconCalendar width={20} height={20} />}
          onChange={(date) => setStartDate(date)}
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
