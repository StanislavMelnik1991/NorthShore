import { Dispatch, SetStateAction } from 'react';
import { Modal } from '@entities/components';
import { Button, Toggle, Text, TextField, StyledTextAria } from '@shared/ui';
import { usePersonalNotification } from '../hook/';
import styles from './personalNotification.module.scss';

interface Props {
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const PersonalNotification = ({ id, open, setOpen }: Props) => {
  const {
    t,
    handleSubmit,
    needToPush,
    setNeedToPush,
    title,
    text,
    setTitle,
    setText,
    isPopUpLoading,
  } = usePersonalNotification(id);

  return (
    <Modal
      isOpen={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <h2 className={styles.modal__title}>
          {t('controls.personal_notification')}
        </h2>
        <div className={styles.toggle_wrapper}>
          <Text>{t('popUp_fields.sent_push')}</Text>
          <Toggle
            value={needToPush}
            onChange={() => setNeedToPush(!needToPush)}
          />
        </div>
        <div className={styles.textfield_wrapper}>
          <TextField
            label={t('popUp_fields.title')}
            placeholder={t('popUp_fields.title_notification')}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div className={styles.textarea_wrapper}>
          <StyledTextAria
            label={t('popUp_fields.text')}
            inputClassName={styles.textarea}
            value={text}
            onChange={(ev) => setText(ev.target.value)}
          />
        </div>
        <div className={styles.btns_wrapper}>
          <Button
            variant="primary"
            width={210}
            disabled={!text.length || !title.length}
            onClick={async () => {
              await handleSubmit();
              setOpen(false);
            }}
            loading={isPopUpLoading}
          >
            {t('btns.send')}
          </Button>
          <Button
            variant="light"
            width={210}
            className={styles.text_primary}
            onClick={() => {
              setOpen(false);
            }}
          >
            {t('btns.cancel')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
