import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/loading-animation.json';
import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $isFullScreen }) =>
    $isFullScreen
      ? css`
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          background-color: #fff;
        `
      : ''}
`;

const spinnerSizes = {
  xs: '120px',
  sm: '160px',
  md: '200px',
  lg: '240px',
};

const StyledLottie = styled(Lottie)`
  width: ${({ $size }) => spinnerSizes[$size]};
  height: ${({ $size }) => spinnerSizes[$size]};

  path {
    fill: ${({ theme }) => theme.palette.primary.main};
  }
`;

const LoadingSpinner = ({ size = 'md', isFullScreen }) => {
  return (
    <Container $isFullScreen={isFullScreen}>
      <StyledLottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        $size={size}
      />
    </Container>
  );
};

export default LoadingSpinner;
