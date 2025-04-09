import { useEffect, useState } from 'react';

export const useDelayLoading = (isLoading: boolean, delay = 1000) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isLoading) {
      timer = setTimeout(() => {
        setShowLoading(false);
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showLoading;
};
