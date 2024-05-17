import classNames from 'classnames';
import { LanguageEnum } from '@shared/constants';
import { Progress, Radio } from '@shared/ui';
import styles from './Answers.module.scss';

type Answer = {
  id: number;
  body: Record<LanguageEnum, string | null>;
  percent_result: number;
  image?: {
    id: number;
    url: string;
  };
};

interface Props {
  className?: string;
  language: LanguageEnum;
  answers: Array<Answer>;
  showPercent?: boolean;
  questionId: number;
  selectedId?: number;
  disabled?: boolean;
  onChange?: (val: number) => void | Promise<void>;
}

export const Answers = ({
  className,
  language,
  answers,
  showPercent = false,
  questionId,
  selectedId,
  disabled,
  onChange,
}: Props) => {
  const isHasImage = !!answers.filter((el) => el.image).length;
  if (showPercent) {
    return (
      <div
        className={classNames(styles.wrapper, className, {
          [styles.wrap]: isHasImage,
        })}
      >
        {answers.map((el) => {
          return (
            <div
              key={`answers-${questionId}-${el.id}`}
              className={classNames(styles.answer, {
                [styles.withImage]: isHasImage,
              })}
            >
              {el.image && (
                <img
                  src={el.image.url}
                  alt={el.body[language] || ''}
                  className={styles.image}
                />
              )}
              <Progress
                label={el.body[language] || ''}
                percent={el.percent_result}
                key={`answers-progress-${questionId}-${el.id}`}
              />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div
      className={classNames(styles.wrapper, className, {
        [styles.wrap]: isHasImage,
      })}
    >
      {answers.map((el) => {
        return (
          <label
            key={`answers-${questionId}-${el.id}`}
            className={classNames(styles.answer, {
              [styles.withImage]: isHasImage,
            })}
          >
            {el.image && (
              <img
                src={el.image.url}
                alt={el.body[language] || ''}
                className={styles.image}
              />
            )}
            <Radio
              wrapperClassName={styles.radio}
              onChange={(ev) => {
                if (ev && onChange) {
                  onChange(el.id);
                }
              }}
              disabled={disabled}
              checked={selectedId === el.id}
              name={`answer-${questionId}`}
              label={el.body[language] || ''}
            />
          </label>
        );
      })}
    </div>
  );
};
