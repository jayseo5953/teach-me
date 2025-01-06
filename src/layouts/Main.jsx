import styled from 'styled-components';

const StyledMain = styled.main`
  padding: 0 24px;
  max-width: 735px;
  margin: auto;
`;

const Main = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default Main;
