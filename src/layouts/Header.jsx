import { styled } from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const StyledHeader = styled.header`
  height: ${({ theme }) => theme.sizes.headerHeight};
  padding: 16px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;
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
            <ChevronLeftIcon color="primary" />
          </Link>
        )}
      </Left>
      <Title>{location.pathname}</Title>
      <Right />
    </StyledHeader>
  );
};

export default Header;
