import styled from 'styled-components';

const shadowDepths = {
  none: 'none',
  soft: '0px 32px 64px 0px rgba(0, 0, 0, 0.07), 0px 16px 32px 0px rgba(0, 0, 0, 0.07), 0px 8px 16px 0px rgba(0, 0, 0, 0.07), 1px 4px 8px 0px rgba(0, 0, 0, 0.07), 0px 2px 4px 0px rgba(0, 0, 0, 0.07), 0px 1px 2px 0px rgba(0, 0, 0, 0.07)',
  default:
    '0px 32px 64px 0px rgba(0, 0, 0, 0.02), 0px 16px 32px 0px rgba(0, 0, 0, 0.01), 1px 8px 16px 0px rgba(0, 0, 0, 0.01), 0px 2px 4px 0px rgba(0, 0, 0, 0.02)',
};

const Container = styled.div`
  background-color: #fff;
  border-radius: 32px;
  box-sizing: border-box;
  padding: 24px;
  display: inline-block;

  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
  box-shadow: ${({ $shadowDepth }) => shadowDepths[$shadowDepth]};
`;

const Sheet = ({
  isFullWidth = false,
  shadowDepth = 'default',
  onClick,
  children,
  ...rest
}) => {
  return (
    <Container
      $isFullWidth={isFullWidth}
      $shadowDepth={shadowDepth}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default Sheet;
