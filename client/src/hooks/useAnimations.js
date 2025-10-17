import { useState, useEffect, useRef } from 'react';

// Custom hook for handling smooth animations
export const useSlideAnimation = (delay = 0, duration = 600) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const slideProps = {
    ref: elementRef,
    className: `slide-animation ${isVisible ? 'slide-in' : 'slide-out'}`,
    style: {
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  };

  return { isVisible, slideProps };
};

// Hook for staggered animations
export const useStaggeredAnimation = (itemCount, staggerDelay = 100, initialDelay = 0) => {
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const timers = [];
    
    for (let i = 0; i < itemCount; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, i]));
      }, initialDelay + (i * staggerDelay));
      
      timers.push(timer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [itemCount, staggerDelay, initialDelay]);

  const getItemProps = (index) => ({
    className: `stagger-item ${visibleItems.has(index) ? 'visible' : 'hidden'}`,
    style: {
      transitionDelay: `${index * staggerDelay}ms`,
      transitionDuration: '600ms',
      transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }
  });

  return { visibleItems, getItemProps };
};

// Hook for fade animations
export const useFadeAnimation = (delay = 0, duration = 800) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const fadeProps = {
    className: `fade-animation ${isVisible ? 'fade-in' : 'fade-out'}`,
    style: {
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: 'ease-out',
    }
  };

  return { isVisible, fadeProps };
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const scrollProps = {
    ref: elementRef,
    className: `scroll-animation ${isVisible ? 'animate-in' : 'animate-out'}`
  };

  return { isVisible, scrollProps };
};

// Hook for modal animations
export const useModalAnimation = (isOpen, duration = 300) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), duration);
    }
  }, [isOpen, duration]);

  const modalProps = {
    className: `modal-animation ${isVisible ? 'modal-enter' : 'modal-exit'}`,
    style: {
      transitionDuration: `${duration}ms`,
    }
  };

  return { shouldRender, modalProps };
};

// Hook for page transitions
export const usePageTransition = (location, duration = 500) => {
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('enter');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('exit');
      
      setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('enter');
      }, duration / 2);
    }
  }, [location, displayLocation, duration]);

  const pageProps = {
    className: `page-transition ${transitionStage}`,
    style: {
      transitionDuration: `${duration / 2}ms`,
    }
  };

  return { displayLocation, transitionStage, pageProps };
};

// Hook for number counter animations
export const useCounterAnimation = (endValue, duration = 2000, startDelay = 0) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsAnimating(true);
      const increment = endValue / (duration / 16); // 60fps
      let current = 0;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= endValue) {
          setCurrentValue(endValue);
          setIsAnimating(false);
          clearInterval(counter);
        } else {
          setCurrentValue(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(counter);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [endValue, duration, startDelay]);

  return { currentValue, isAnimating };
};

const animationHooks = {
  useSlideAnimation,
  useStaggeredAnimation,
  useFadeAnimation,
  useScrollAnimation,
  useModalAnimation,
  usePageTransition,
  useCounterAnimation
};

export default animationHooks;
