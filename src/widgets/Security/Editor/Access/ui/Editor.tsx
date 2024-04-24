import classNames from 'classnames';
import { FormikErrors } from 'formik';
import { AddressFilters } from '@features/address';
import { IconClose, IconPlus } from '@shared/icons';
import { Button, Text, Title } from '@shared/ui';
import { useSecurityAccessEditor } from '../hook';
import styles from './Editor.module.scss';

type Data = {
  entrances_ids: number[];
};

interface Props {
  title?: string;
  values: Data;
  errors: FormikErrors<Data>;
  setFieldValue: (
    field: keyof Data,
    value: Array<number>,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Data>>;
}

export const SecurityAccessEditor = ({
  // values,
  setFieldValue,
  // errors,
  title,
}: Props) => {
  const { t, onAdd, onChange, onClear, address, isDisabled } =
    useSecurityAccessEditor({
      setFieldValue,
    });

  return (
    <div className={styles.wrapper}>
      <Title fontWeight="semibold" className={styles.title}>
        {title}
      </Title>
      {address.map((el, index) => {
        const isRemoveDisabled = !el.entrance_id || address.length === 1;
        return (
          <div className={styles.element} key={`AddressFilters-${index}`}>
            <AddressFilters setFilters={onChange(index)} />
            <IconClose
              width={20}
              height={20}
              className={classNames(styles.icon, {
                [styles.disabled]: isRemoveDisabled,
              })}
              onClick={isRemoveDisabled ? undefined : onClear(index)}
            />
          </div>
        );
      })}
      <Button
        variant="white"
        onClick={onAdd}
        className={styles.add}
        disabled={isDisabled}
      >
        <IconPlus width={20} height={20} />
        <Text>{t('actions.addAddress')}</Text>
      </Button>
    </div>
  );
};
