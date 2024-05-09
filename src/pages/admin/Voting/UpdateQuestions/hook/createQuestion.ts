import { useCallback } from 'react';
import { useCreateAnswer, useCreateQuestion } from '@features/Admin';
import { IFile } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

type Answer = {
  id: number;
  value: string;
  image?: IFile;
};

type QuestionType = {
  id: number;
  value: string;
  answers: Array<Answer>;
};

interface Props {
  electionId: string;
  questions: Record<LanguageEnum, QuestionType>[];
  setQuestions: (val: Record<LanguageEnum, QuestionType>[]) => void;
}

export const useCreateNewQuestion = ({
  electionId,
  questions,
  setQuestions,
}: Props) => {
  const { create: createQuestion, loading: questionLoading } =
    useCreateQuestion(electionId);
  const { create: createAnswer, loading: answerLoading } = useCreateAnswer({
    electionId,
  });

  const handleCreate = useCallback(async () => {
    const body = { body_en: '', body_ru: '' };
    const question = await createQuestion(body);
    if (question && question.id) {
      const [first, second] = await Promise.all([
        createAnswer({ body, questionId: question.id }),
        createAnswer({ body, questionId: question.id }),
      ]);
      const newQuestion: Record<LanguageEnum, QuestionType> = {
        en: {
          id: question.id,
          value: question.body.en || '',
          answers: [],
        },
        ru: {
          id: question.id,
          value: question.body.ru || '',
          answers: [],
        },
      };

      if (first && first.id) {
        newQuestion.en.answers.push({ id: first.id, value: '' });
        newQuestion.ru.answers.push({ id: first.id, value: '' });
      }
      if (second && second.id) {
        newQuestion.en.answers.push({ id: second.id, value: '' });
        newQuestion.ru.answers.push({ id: second.id, value: '' });
      }
      setQuestions([...questions, newQuestion]);
    }
  }, [createAnswer, createQuestion, questions, setQuestions]);

  return { handleCreate, creationLoading: questionLoading || answerLoading };
};
