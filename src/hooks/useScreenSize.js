import { useMediaQuery } from 'react-responsive';

export const useScreenSize = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1223 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isMobileL = useMediaQuery({ minWidth: 376, maxWidth: 485 });
  const isMobileM = useMediaQuery({ minWidth: 320, maxWidth: 375 });
  const isMobileS = useMediaQuery({ maxWidth: 320 });

  return {
    isDesktop,
    isLaptop,
    isTablet,
    isMobile,
    isMobileL,
    isMobileM,
    isMobileS,
  };
};
