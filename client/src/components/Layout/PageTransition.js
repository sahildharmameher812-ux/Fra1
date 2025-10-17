import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { usePageTransition } from '../../hooks/useAnimations';

const PageTransition = ({ children, duration = 600 }) => {
  const location = useLocation();
  const { displayLocation, transitionStage, pageProps } = usePageTransition(location.pathname, duration);

  return (
    <Box 
      {...pageProps}
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Box
        className={`page-content ${transitionStage}`}
        sx={{
          width: '100%',
          height: '100%',
          transform: transitionStage === 'enter' ? 'translateX(0)' : 'translateX(-100%)',
          opacity: transitionStage === 'enter' ? 1 : 0,
          transition: `all ${duration / 2}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

// Alternative slide transition component for sections within a page
export const SlideTransition = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 600,
  distance = 30,
  ...props 
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getTransformValue = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    
    switch (direction) {
      case 'up': return `translate3d(0, ${distance}px, 0)`;
      case 'down': return `translate3d(0, -${distance}px, 0)`;
      case 'left': return `translate3d(${distance}px, 0, 0)`;
      case 'right': return `translate3d(-${distance}px, 0, 0)`;
      default: return `translate3d(0, ${distance}px, 0)`;
    }
  };

  return (
    <Box
      ref={ref}
      {...props}
      sx={{
        transform: getTransformValue(),
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
        willChange: 'transform, opacity',
        ...props.sx
      }}
    >
      {children}
    </Box>
  );
};

// Staggered children animation component
export const StaggeredContainer = ({ 
  children, 
  staggerDelay = 100, 
  initialDelay = 0,
  direction = 'up',
  ...props 
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <Box {...props}>
      {childrenArray.map((child, index) => (
        <SlideTransition
          key={index}
          direction={direction}
          delay={initialDelay + (index * staggerDelay)}
          duration={600}
        >
          {child}
        </SlideTransition>
      ))}
    </Box>
  );
};

// Fade transition component
export const FadeTransition = ({ 
  children, 
  delay = 0, 
  duration = 800,
  ...props 
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Box
      {...props}
      sx={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ease-out`,
        willChange: 'opacity',
        ...props.sx
      }}
    >
      {children}
    </Box>
  );
};

// Scale transition component for cards and modals
export const ScaleTransition = ({ 
  children, 
  delay = 0, 
  duration = 500,
  startScale = 0.9,
  ...props 
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Box
      {...props}
      sx={{
        transform: `scale(${isVisible ? 1 : startScale})`,
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
        willChange: 'transform, opacity',
        ...props.sx
      }}
    >
      {children}
    </Box>
  );
};

// Slide in from edge animation
export const SlideInTransition = ({ 
  children, 
  direction = 'left', 
  delay = 0, 
  duration = 600,
  distance = 100,
  ...props 
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return `translateX(-${distance}px)`;
      case 'right': return `translateX(${distance}px)`;
      case 'up': return `translateY(-${distance}px)`;
      case 'down': return `translateY(${distance}px)`;
      default: return `translateX(-${distance}px)`;
    }
  };

  return (
    <Box
      {...props}
      sx={{
        transform: isVisible ? 'translate(0, 0)' : getInitialTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        willChange: 'transform, opacity',
        ...props.sx
      }}
    >
      {children}
    </Box>
  );
};

export default PageTransition;