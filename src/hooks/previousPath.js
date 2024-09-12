import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const usePreviousPath = () => {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    previousPath.current = document.referrer;
  }, [location]);

  return previousPath.current;
};

export default usePreviousPath;
