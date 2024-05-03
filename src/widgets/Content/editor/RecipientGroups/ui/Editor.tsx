import classNames from 'classnames';
import { FormikErrors } from 'formik';
import { AddressFilters } from '@features/address';
import { ISelectOption } from '@entities/components';
import { IconClose, IconPlusRounded } from '@shared/icons';
import { Button, CheckBox, Text, Title } from '@shared/ui';
import { useSecurityAccessEditor } from '../hook';
import styles from './Editor.module.scss';

type Group = {
  street_id?: number | undefined;
  building_id?: number | undefined;
  entrance_id?: number | undefined;
  apartment_id?: number | undefined;
};

type Data = {
  recipient_groups: Array<Group>;
};

interface Props {
  title?: string;
  className?: string;
  isSendToAll: boolean;
  setIsSendToAll: (val: boolean) => void;
  initialAccess?: Array<{
    street?: ISelectOption;
    building?: ISelectOption;
    entrance?: ISelectOption;
  }>;
  setFieldValue: (
    field: keyof Data,
    value: Array<Group>,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Data>>;
}

export const RecipientGroupsEditor = ({
  setFieldValue,
  title,
  initialAccess,
  className,
  setIsSendToAll,
  isSendToAll,
}: Props) => {
  const { t, onAdd, onChange, onClear, address, isDisabled } =
    useSecurityAccessEditor({
      setFieldValue,
      initialAccess,
    });
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Title fontWeight="semibold" className={styles.title}>
        {title}
      </Title>
      <CheckBox
        wrapperClassName={styles.checkbox}
        value={isSendToAll}
        onChange={setIsSendToAll}
        label={t('actions.sendToAll')}
      />
      {address.map((el, index) => {
        const isRemoveDisabled = !el?.entrance || address.length === 1;
        return (
          <div className={styles.element} key={`AddressFilters-${el.id}`}>
            <AddressFilters
              className={styles.address}
              disabled={{
                apartment: isSendToAll,
                building: isSendToAll,
                entrance: isSendToAll,
                street: isSendToAll,
              }}
              initialValues={initialAccess?.[index]}
              setFilters={onChange(index)}
              showApartment
              showLabel
            />
            <Button
              variant="text"
              onClick={onClear(index)}
              className={classNames(styles.button, styles.remove)}
              disabled={isRemoveDisabled}
            >
              <IconClose width={20} height={20} />
            </Button>
          </div>
        );
      })}
      <Button
        variant="text"
        onClick={onAdd}
        className={styles.button}
        disabled={isDisabled}
      >
        <IconPlusRounded width={20} height={20} />
        <Text>{t('actions.addAddress')}</Text>
      </Button>
    </div>
  );
};
