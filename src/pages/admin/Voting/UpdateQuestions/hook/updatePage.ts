import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCurrentVoting } from '@features/Admin';
import { IFile, IVoting } from '@entities/types';
import { AppRoutes, AppRoutesEnum, LanguageEnum } from '@shared/constants';
import { useCreateNewQuestion } from './createQuestion';
import { useVotingSubmit } from './submit';

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

export const useUpdatePage = () => {
  const { t } = useTranslation('voting');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getData, isLoading } = useGetCurrentVoting(id as string);
  const { onSubmit, back } = useVotingSubmit(id as string);
  const [data, setData] = useState<IVoting>();
  const [questions, setQuestions] = useState<
    Array<Record<LanguageEnum, QuestionType>>
  >([]);
  const { creationLoading, handleCreate } = useCreateNewQuestion({
    electionId: id as string,
    questions,
    setQuestions,
  });

  const handleGetData = useCallback(async () => {
    const voting = await getData();
    if (!voting) {
      navigate(-1);
      return;
    }
    if (voting.status.id !== 1) {
      navigate(AppRoutes[AppRoutesEnum.ADMIN_VOTING_CURRENT](id as string));
    }
    setData(voting);

    if (!voting) {
      return;
    }
    const dataQuestions = voting.election_questions;

    const newQuestions: Array<Record<LanguageEnum, QuestionType>> =
      dataQuestions.map(({ id, body, answer_variants }) => {
        return {
          en: {
            id,
            value: body.en || '',
            answers: answer_variants.map(({ id, body, image_en }) => {
              return {
                id,
                value: body.en || '',
                image: image_en,
              };
            }),
          },
          ru: {
            id,
            value: body.ru || '',
            answers: answer_variants.map(({ id, body, image_ru }) => {
              return {
                id,
                value: body.ru || '',
                image: image_ru,
              };
            }),
          },
        };
      });
    setQuestions(newQuestions);
  }, [getData, id, navigate]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleChangeQuestion = useCallback(
    ({ index, lang }: { lang: LanguageEnum; index: number }) =>
      (data: QuestionType) => {
        const newQuestions = [...questions];
        if (!newQuestions[index]) {
          return;
        }
        newQuestions[index][lang] = data;
        setQuestions(newQuestions);
      },
    [questions],
  );

  const handleDeleteQuestion = useCallback(
    (index: number) => () => {
      const newQuestions = [...questions];
      if (!newQuestions[index]) {
        return;
      }
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
    },
    [questions],
  );

  const handleSubmit = useCallback(() => {
    onSubmit(questions);
  }, [onSubmit, questions]);

  return {
    questions,
    is_archive: data?.is_archive || false,
    t,
    isLoading,
    id: id as string,
    handleChangeQuestion,
    handleDeleteQuestion,
    creationLoading,
    handleCreate,
    handleSubmit,
    back,
  };
};
