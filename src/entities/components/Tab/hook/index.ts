import { useState } from 'react';

interface Props {
  selected?: number;
}

export const useTab = ({ selected = 0 }: Props) => {
  const [active, setActive] = useState(selected);

  return {
    active,
    setActive,
  };
};
