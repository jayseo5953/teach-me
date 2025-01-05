import styled from 'styled-components';

const StyledMain = styled.main`
  padding: 0 24px;
`;

const Main = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default Main;
