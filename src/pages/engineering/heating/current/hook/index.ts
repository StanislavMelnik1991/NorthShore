import { useTranslation } from 'react-i18next';

export const useCurrentEnergy = () => {
  const { t } = useTranslation('engineering');
  // const { id } = useParams<{ id: string }>();
  const outsideTemperature = 24;
  const accidents = [
    'Авария насосов А',
    'Авария в контуре А',
    'Авария в контуре В',
    'Авария насосов В',
  ];
  return {
    t,
    outsideTemperature,
    accidents,
  };
};
