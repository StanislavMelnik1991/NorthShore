import classNames from 'classnames';
import { MouseEventHandler } from 'react';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { IAnswer } from '@entities/types';
import { LanguageEnum } from '@shared/constants';
import { Progress, Radio } from '@shared/ui';
import styles from './Answers.module.scss';

interface Props {
  className?: string;
  language: LanguageEnum;
  answers: Array<IAnswer>;
  showPercent?: boolean;
  questionId: number;
  selectedId?: number;
  disabled?: boolean;
  onChange?: (val: number) => void | Promise<void>;
  onAnswerClick?: (answer: IAnswer) => MouseEventHandler;
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
  onAnswerClick,
}: Props) => {
  const isHasImage = !!answers.filter((el) => el[`image_${language}`]).length;
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
              {el[`image_${language}`] && (
                <img
                  src={el[`image_${language}`]?.url}
                  alt={el.body[language] || ''}
                  className={styles.image}
                />
              )}
              <Progress
                onLabelClick={onAnswerClick && onAnswerClick(el)}
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
            {el[`image_${language}`] && (
              <img
                src={el[`image_${language}`]?.url}
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
