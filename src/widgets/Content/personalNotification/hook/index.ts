import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';

export const usePersonalNotification = (id: string) => {
  const { t } = useTranslation('residents');
  const [needToPush, setNeedToPush] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const [isPopUpLoading, setIsPopUpLoading] = useState(false);

  const handleSubmit = async () => {
    setIsPopUpLoading(true);
    try {
      await axiosApi.put(`/user/${id}/notifications`, {
        title_en: title,
        title_ru: title,
        body_en: text,
        body_ru: text,
        need_push: needToPush ? 1 : 0,
      });
      toast.success(t('toast.send_notification'));
      window.location.reload();
    } catch (error) {
      toast.error(t('toast.notificationsError'));
    }
    setIsPopUpLoading(false);
    setTitle('');
    setText('');
    setNeedToPush(false);
  };

  return {
    handleSubmit,
    needToPush,
    setNeedToPush,
    title,
    text,
    setTitle,
    setText,
    t,
    isPopUpLoading,
  };
};
