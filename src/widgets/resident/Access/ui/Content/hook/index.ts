import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  data: Array<{ name: string; data: Array<{ id: string | number }> }>;
}

export const useContent = ({ data }: Props) => {
  const { t } = useTranslation('residents');
  const [isEdit, setIsEdit] = useState(false);
  const [deleted, setDeleted] = useState<number | string>();
  const isEditable = data.some(({ data }) => !!data.length);

  return { t, isEditable, isEdit, setIsEdit, deleted, setDeleted };
};
