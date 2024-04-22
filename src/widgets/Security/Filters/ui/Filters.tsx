import classNames from 'classnames';
import { useState } from 'react';
import { StyledSelect } from '@entities/components';
import { useSecurityFilters } from '../hook';
import styles from './Filters.module.scss';

interface Props {
  className?: string;
}

export const SecurityFilters = ({ className }: Props) => {
  const { t, data } = useSecurityFilters();
  const [val, setVal] = useState<number>();

  return (
    <div className={classNames(styles.wrapper, className)}>
      <StyledSelect
        className={styles.select}
        placeholder={t('editor.street.placeholder')}
        onChange={(val) => {
          if (val) {
            setVal(Number((val as { value: number; label: string }).value));
          } else {
            setVal(undefined);
          }
        }}
        options={data.map((el) => {
          return {
            value: el.id,
            label: el.name,
          };
        })}
      />
      {val}
    </div>
  );
};
