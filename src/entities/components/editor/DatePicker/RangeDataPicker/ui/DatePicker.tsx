import { ReactDatePickerProps } from 'react-datepicker';
import { LocalizedDatePicker } from '../../localized';

interface Props extends Omit<ReactDatePickerProps, 'locale' | 'onChange'> {
  label?: string;
  error?: string;
  onChange: (val: [Date | null, Date | null]) => void;
  borderClassName?: string;
}

export const RangeDatePicker = ({ onChange, ...props }: Props) => {
  return (
    <LocalizedDatePicker
      dateFormat="dd MM yyyy"
      selectsRange={true}
      // fix onChange type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={onChange as any}
      {...props}
    />
  );
};
