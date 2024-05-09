import classNames from 'classnames';
import { SafeParseError } from 'zod';
import { IFile } from '@entities/types';
import { LanguageEnum } from '@shared/constants';
import {
  ANSWERS_LIMIT_MAX,
  ANSWERS_LIMIT_MIN,
} from '@shared/constants/voting.constants';
import { IconBasket, IconPlusRounded } from '@shared/icons';
import { Button, Divider, Text, TextField, Title } from '@shared/ui';
import { AnswerEditor } from '../../Answer';
import { useQuestionEditor } from '../hook';
import styles from './Question.module.scss';

type Answer = {
  id: number;
  value: string;
  image?: IFile;
};

type DataType = {
  id: number;
  value: string;
  answers: Array<Answer>;
};

interface Props {
  className?: string;
  votingId: number | string;
  data: Record<LanguageEnum, DataType>;
  onChange: Record<LanguageEnum, (data: DataType) => void>;
  onDelete: () => void;
  serialNumber: number;
  language: LanguageEnum;
  errors?: SafeParseError<DataType>['error'];
}

export const QuestionEditor = ({
  className,
  data,
  onChange,
  votingId,
  serialNumber,
  language,
  onDelete,
}: Props) => {
  const {
    handleChangeQuestion,
    handleCreate,
    createLoading: loading,
    t,
    changeAnswerImage,
    changeAnswerValue,
    handleDeleteAnswer,
    handleDeleteQuestion,
    deleteLoading,
  } = useQuestionEditor({
    data,
    language,
    onChange,
    votingId,
    onDelete,
  });
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Title variant="h2" fontWeight="bold">
        {t(`editor.titles.${language}`)}
      </Title>

      <div className={styles.answers}>
        <div className={styles.header}>
          <Text
            variant="body16"
            fontWeight="semibold"
          >{`${serialNumber} ${t('editor.question.label')}`}</Text>
          <Button
            onClick={handleDeleteQuestion}
            loading={deleteLoading}
            className={styles.deleteButton}
            variant="text"
          >
            <IconBasket width={20} height={20} />
            {t('controls.delete')}
          </Button>
        </div>
        <TextField
          value={data[language].value}
          onChange={(ev) => handleChangeQuestion(ev.target.value)}
          wrapperClassName={styles.padding}
          placeholder={t('editor.question.placeholder')}
        />
        <Divider />
        <div className={styles.list}>
          {data[language].answers.map((el, index) => {
            return (
              <AnswerEditor
                handleDeleteAnswer={handleDeleteAnswer(index)}
                isDeleteDisabled={
                  data[language].answers.length <= ANSWERS_LIMIT_MIN ||
                  data[language].answers.length >= ANSWERS_LIMIT_MAX
                }
                questionId={data[language].id}
                votingId={votingId}
                answerId={el.id}
                image={el.image?.url}
                changeValue={changeAnswerValue(index)}
                setImage={changeAnswerImage(index)}
                value={el.value}
                key={`AnswerEditor-${el.id}-${language}`}
              />
            );
          })}
          <Button
            variant="text"
            onClick={handleCreate}
            loading={loading}
            disabled={
              data[language].answers[data[language].answers.length - 1]
                ?.value === '' ||
              data[language].answers.length >= ANSWERS_LIMIT_MAX
            }
          >
            <IconPlusRounded width={20} height={20} />
            {t('controls.addVariant')}
          </Button>
        </div>
      </div>
    </div>
  );
};
