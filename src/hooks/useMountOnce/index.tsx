import { useEffect, useRef } from 'react';
import type { MountOnceCallback } from './types';

const useMountOnce = (callback: MountOnceCallback) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      callback();
      hasRun.current = true;
    }
  }, []);
};

export default useMountOnce;
