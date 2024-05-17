import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useUpdateAnswer,
  useUpdateQuestion,
  useUpdateVoting,
} from '@features/Admin';
import { BaseEntity, IFile } from '@entities/types';
import { AppRoutes, AppRoutesEnum, LanguageEnum } from '@shared/constants';

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
export const useVotingSubmit = (electionId: string | number) => {
  const navigate = useNavigate();
  const { update: updateQuestion } = useUpdateQuestion(electionId);
  const { update: updateAnswer } = useUpdateAnswer(electionId);
  const { update: updateVoting } = useUpdateVoting();
  const onSubmit = useCallback(
    async (data: Array<Record<LanguageEnum, QuestionType>>) => {
      const tasks: Array<Promise<BaseEntity | undefined>> = [];
      data.forEach(({ en, ru }) => {
        const answers: Array<{
          questionId: number;
          answerId: number;
          body: { en: string; ru: string };
          image_en_id?: number;
          image_ru_id?: number;
        }> = en.answers.map((el) => {
          return {
            answerId: el.id,
            questionId: en.id,
            image_en_id: el.image?.id,
            body: { en: el.value, ru: '' },
          };
        });
        ru.answers.forEach((el, index) => {
          answers[index].body.ru = el.value;
          answers[index].image_ru_id = el.image?.id;
        });
        tasks.push(
          updateQuestion({
            questionId: en.id,
            body: { body_en: en.value, body_ru: ru.value },
          }),
        );
        answers.forEach((el) => {
          updateAnswer({
            answerId: el.answerId,
            body: {
              body_en: el.body.en,
              body_ru: el.body.ru,
              image_en_id: el.image_en_id,
              image_ru_id: el.image_ru_id,
            },
            questionId: el.questionId,
          });
        });
      });
      await Promise.all(tasks);
      await updateVoting({ body: { is_archive: false }, id: electionId });
      navigate(AppRoutes[AppRoutesEnum.ADMIN_VOTING]());
    },
    [updateVoting, electionId, navigate, updateQuestion, updateAnswer],
  );

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return { onSubmit, back };
};
