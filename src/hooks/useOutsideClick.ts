import { useEffect, useCallback } from 'react';

type CommonClickEvent = MouseEvent | TouchEvent;

function useOutsideClick<T extends HTMLElement | null>(
  ref: React.RefObject<T>,
  handler: (e: CommonClickEvent) => void
) {
  const handleClick = useCallback(
    (e: CommonClickEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler(e);
      }
    },
    [ref, handler]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [handleClick]);
}

export default useOutsideClick;
