import styled from 'styled-components';

const StyledMain = styled.main`
  padding: 0 16px;
`;

const Main = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default Main;
