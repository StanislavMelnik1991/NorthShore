import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetCurrentVoting, useVoteForCurrentAnswer } from '@features/Admin';
import { IVoting } from '@entities/types';

export const useCurrent = () => {
  const { t, i18n } = useTranslation('voting');
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IVoting>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [results, setResults] = useState<
    Array<{ questionId: number; variantId?: number }>
  >([]);
  const { getData, isLoading } = useGetCurrentVoting(id as string);
  const { vote, isLoading: voteLoading } = useVoteForCurrentAnswer();

  const handleGetData = useCallback(async () => {
    const newData = await getData();
    if (newData) {
      setData(newData);
    }
  }, [getData]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  useEffect(() => {
    if (data) {
      const questions = data.election_questions.map((el) => {
        return {
          questionId: el.id,
          variantId: el.chosen_answer_id || 0,
        };
      });
      setResults(questions);
    }
  }, [data]);

  const handleVote = useCallback(
    (questionId: number) => async (variantId: number) => {
      const newResults = [...results];
      const question = newResults.find((el) => el.questionId === questionId);
      if (!question) {
        return;
      }
      question.variantId = variantId;
      setResults(newResults);
    },
    [results],
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleSubmit = useCallback(async () => {
    const errors = results.map((el) => el.variantId).filter((el) => !el);
    if (errors.length) {
      toast.error(t('unexpected'));
      return;
    }
    const jobs = results.map(({ questionId, variantId }) => {
      return vote({
        electionId: id as string,
        questionId,
        variantId: variantId as number,
      });
    });
    await Promise.all(jobs);
    setIsModalOpen(false);
    handleGetData();
  }, [handleGetData, id, results, t, vote]);

  const isVoting = !!data?.election_questions
    .map((el) => !!el.chosen_answer_id)
    .filter((el) => el).length;

  return {
    data,
    isLoading: isLoading || voteLoading,
    t,
    i18n,
    handleVote,
    results,
    handleSubmit,
    isValid: !results.map((el) => el.variantId).filter((el) => !el).length,
    isVoting,
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
  };
};
