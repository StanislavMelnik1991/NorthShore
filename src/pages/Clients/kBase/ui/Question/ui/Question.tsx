import classNames from 'classnames';
import { IconMinus, IconPlus } from '@shared/icons';
import { Button, Text } from '@shared/ui';
import { useQuestion } from '../hook';
import styles from './Question.module.scss';

interface Props {
  className?: string;
  question: string;
  answer: string;
}

const Question = ({ className, answer, question }: Props) => {
  const { handleToggleShow, isShow } = useQuestion();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.header}>
        <Text fontWeight="semibold" variant="body16">
          {question}
        </Text>
        <Button
          className={styles.button}
          variant="text"
          onClick={handleToggleShow}
        >
          {isShow ? (
            <IconMinus className={styles.icon} width={24} height={24} />
          ) : (
            <IconPlus className={styles.icon} width={24} height={24} />
          )}
        </Button>
      </div>
      <Text
        fontWeight="regular"
        variant="body14"
        className={classNames(styles.text, { [styles.show]: isShow })}
      >
        {answer}
      </Text>
    </div>
  );
};

export default Question;
