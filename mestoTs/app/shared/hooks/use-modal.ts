import { useState, useMemo } from 'react';

export const useModal = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return useMemo(
    () => ({
      visible,
      open: () => setVisible(true),
      close: () => setVisible(false),
      toggle: () => setVisible(v => !v),
    }),
    [visible],
  );
};
