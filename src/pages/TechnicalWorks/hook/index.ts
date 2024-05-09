import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITechWork } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

export const useTechnicalWorks = () => {
  const { t, i18n } = useTranslation('technicalWorks');
  const [activeItem, setActiveItem] = useState<{
    item: ITechWork;
    period: string;
  }>();

  return {
    t,
    lang: i18n.language as LanguageEnum,
    activeItem,
    setActiveItem,
  };
};
