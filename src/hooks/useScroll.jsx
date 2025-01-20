import { useEffect, useRef, useState } from 'react';

const useScroll = ({ scrollOffset = 200 } = {}) => {
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const containerRef = useRef();
  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      setIsScrolledUp(
        container.scrollHeight - container.scrollTop >
          container.clientHeight + scrollOffset
      );
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return { containerRef, bottomRef, scrollToBottom, isScrolledUp };
};

export default useScroll;
