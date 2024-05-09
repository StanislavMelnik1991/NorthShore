import classNames from 'classnames';
import { Cover } from '@entities/components';
import { IFile } from '@entities/types';
import { IconClose, IconImage } from '@shared/icons';
import { Button, Loader, TextField } from '@shared/ui';
import { useAnswerEditor } from '../hook';
import styles from './Answer.module.scss';

interface Props {
  className?: string;
  votingId: number | string;
  questionId: number;
  handleDeleteAnswer: () => void;
  answerId: number;
  value: string;
  image?: string;
  changeValue: (val: string) => void;
  setImage: (image?: IFile) => void;
  isDeleteDisabled?: boolean;
}

export const AnswerEditor = ({
  className,
  answerId,
  changeValue,
  handleDeleteAnswer,
  setImage,
  questionId,
  value,
  votingId,
  isDeleteDisabled,
  image,
}: Props) => {
  const { handleDelete, t, getInputProps, deleteLoading, uploadLoading, open } =
    useAnswerEditor({
      votingId,
      questionId,
      handleDeleteAnswer,
      answerId,
      setImage,
    });
  return (
    <div className={classNames(styles.wrapper, className)}>
      <input {...getInputProps()} />
      <div className={styles.input}>
        <div className={styles.circle} />
        <TextField
          value={value}
          onChange={(ev) => changeValue(ev.target.value)}
          wrapperClassName={styles.textfield}
          placeholder={t('editor.answer.label')}
          rightItem={
            uploadLoading ? (
              <Loader size={20} />
            ) : (
              <IconImage width={20} height={20} onClick={open} />
            )
          }
        />
        <Button
          disabled={isDeleteDisabled}
          onClick={handleDelete}
          className={styles.deleteButton}
          loading={deleteLoading}
          variant="text"
        >
          <IconClose width={20} height={20} />
        </Button>
      </div>
      {image && (
        <Cover
          className={styles.cover}
          src={image}
          onRemove={() => setImage()}
        />
      )}
    </div>
  );
};
