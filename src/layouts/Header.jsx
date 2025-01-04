import { styled } from 'styled-components';
import { useLocation, Link } from 'react-router-dom';

const StyledHeader = styled.header`
  height: 25px;
  padding: 16px;
  width: calc(100vw - 32px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Left = styled(Link)`
  flex: 0 0 auto;
`;

const Right = styled(Link)`
  flex: 0 0 auto;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  white-space: nowrap;
`;

const Header = () => {
  // const { user, logout } = useAuth();

  const location = useLocation();

  const isRoot = location.pathname === '/';
  const parentPath = location.pathname.split('/').slice(0, -1).join('/') || '/';

  return (
    <StyledHeader>
      <Left>
        {!isRoot && (
          <Link to={parentPath} relative="path">
            Back
          </Link>
        )}
      </Left>
      <Title>{location.pathname}</Title>
      <Right />
    </StyledHeader>
  );
};

export default Header;
