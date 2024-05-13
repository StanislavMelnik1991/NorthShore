import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IAnnouncement } from '@entities/types';

export const useAnnouncements = () => {
  const { t, i18n } = useTranslation('announcements');
  const [activeItem, setActiveItem] = useState<IAnnouncement>();

  return {
    t,
    i18n,
    activeItem,
    setActiveItem,
  };
};
