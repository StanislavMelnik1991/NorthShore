import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@features/User/hook';
import { ITechWork, IAnnouncement } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

export const useMainPage = () => {
  const { t, i18n } = useTranslation();
  const { user } = useUser();

  const [activeTechWork, setActiveTechWork] = useState<{
    item: ITechWork;
    period: string;
  }>();
  const [activeAnnouncement, setActiveAnnouncement] = useState<IAnnouncement>();

  const userGreetingsMessage = `${t('controls.greetings')}, ${user?.name}`;
  const dateOptions = {
    year: 'numeric' as const,
    month: '2-digit' as const,
    day: '2-digit' as const,
    weekday: 'long' as const,
  };
  const dateString = new Date().toLocaleDateString(i18n.language, dateOptions);

  return {
    userGreetingsMessage,
    dateString,
    activeTechWork,
    setActiveTechWork,
    activeAnnouncement,
    setActiveAnnouncement,
    lang: i18n.language as LanguageEnum,
    i18n,
  };
};
