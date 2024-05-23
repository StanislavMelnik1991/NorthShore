import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateAnswer, useDeleteQuestion } from '@features/Admin';
import { IFile } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

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
  votingId: number | string;
  data: Record<LanguageEnum, DataType>;
  onChange: Record<LanguageEnum, (data: DataType) => void>;
  onDelete?: false | (() => void);
  language: LanguageEnum;
}

export const useQuestionEditor = ({
  votingId,
  onChange,
  data,
  language,
  onDelete,
}: Props) => {
  const { handleDelete, loading: deleteLoading } = useDeleteQuestion({
    electionId: votingId,
    questionId: data.ru?.id || data.en.id,
  });
  const { create, loading: createLoading } = useCreateAnswer({
    electionId: votingId,
  });
  const { t } = useTranslation('voting');

  const anotherLang =
    language === LanguageEnum.EN ? LanguageEnum.RU : LanguageEnum.EN;
  const handleCreate = useCallback(async () => {
    const answer = await create({
      body: { body_en: '', body_ru: '' },
      questionId: data[language].id,
    });
    if (answer) {
      const { id } = answer;
      const newData = {
        ru: { ...data.ru, answers: [...data.ru.answers] },
        en: { ...data.en, answers: [...data.en.answers] },
      };
      newData.en.answers.push({
        id,
        value: '',
      });
      newData.ru.answers.push({
        id,
        value: '',
      });
      onChange.ru(newData.ru);
      onChange.en(newData.en);
    }
  }, [create, data, language, onChange]);

  const changeAnswerValue = useCallback(
    (index: number) => (val: string) => {
      const newValues = [...data[language].answers];
      if (!newValues[index]) {
        return;
      }
      newValues[index].value = val;
      onChange[language]({ ...data[language], answers: newValues });
    },
    [data, language, onChange],
  );

  const changeAnswerImage = useCallback(
    (index: number) => (image?: IFile) => {
      const newData = {
        ru: { ...data.ru, answers: [...data.ru.answers] },
        en: { ...data.en, answers: [...data.en.answers] },
      };
      if (!newData[language].answers[index]) {
        return;
      }
      newData[language].answers[index].image = image;
      onChange[language](newData[language]);
      if (!newData[anotherLang].answers[index].image?.url) {
        newData[anotherLang].answers[index].image = image;
        onChange[anotherLang](newData[anotherLang]);
      }
    },
    [anotherLang, data.en, data.ru, language, onChange],
  );

  const handleChangeQuestion = useCallback(
    (val: string) => {
      onChange[language]({ ...data[language], value: val });
    },
    [data, language, onChange],
  );

  const handleDeleteAnswer = useCallback(
    (index: number) => () => {
      const newData = {
        ru: { ...data.ru, answers: [...data.ru.answers] },
        en: { ...data.en, answers: [...data.en.answers] },
      };
      if (!newData[language].answers[index]) {
        return;
      }
      newData.ru.answers.splice(index, 1);
      newData.en.answers.splice(index, 1);
      onChange.ru(newData.ru);
      onChange.en(newData.en);
    },
    [data.en, data.ru, language, onChange],
  );

  const handleDeleteQuestion = useCallback(async () => {
    if (!onDelete) {
      return;
    }
    await handleDelete();
    onDelete();
  }, [handleDelete, onDelete]);

  return {
    handleCreate,
    createLoading,
    deleteLoading,
    t,
    changeAnswerValue,
    changeAnswerImage,
    handleChangeQuestion,
    handleDeleteAnswer,
    handleDeleteQuestion,
  };
};
