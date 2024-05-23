import classNames from 'classnames';
import { Button, TextField } from '@shared/ui';
import { useUserName } from '../hook';
import styles from './Name.module.scss';

interface Props {
  className?: string;
}

export const UserName = ({ className }: Props) => {
  const { t, handleSubmit, setFieldValue, values, handleReset } = useUserName();
  return (
    <form
      className={classNames(styles.wrapper, className)}
      onSubmit={handleSubmit}
    >
      <TextField
        value={values.name}
        onChange={(ev) => {
          setFieldValue('name', ev.target.value);
        }}
        label={t('blocks.name.label')}
        placeholder={t('blocks.name.placeholder')}
      />
      {/* <TextField
        value={values.surname}
        onChange={(ev) => {
          setFieldValue('surname', ev.target.value);
        }}
        label={t('blocks.surname.label')}
        placeholder={t('blocks.surname.placeholder')}
      /> */}
      <div className={styles.buttons}>
        <Button type="submit" variant="primary">
          {t('blocks.btns.save')}
        </Button>
        <Button onClick={handleReset} type="button" variant="secondary">
          {t('blocks.btns.cancel')}
        </Button>
      </div>
    </form>
  );
};
