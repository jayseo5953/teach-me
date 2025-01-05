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

const Left = styled.div`
  flex: 0 0 auto;
`;

const Right = styled.div`
  flex: 0 0 auto;
`;

const routesToHideBackButtons = ['/chat', '/chat/post-chat'];

const Header = () => {
  const location = useLocation();
  const isRoot = location.pathname === '/';
  const parentPath = location.pathname.split('/').slice(0, -1).join('/') || '/';
  const hideBackButton =
    isRoot || routesToHideBackButtons.includes(location.pathname);
  return (
    <StyledHeader>
      <Left>
        {!hideBackButton && (
          <Link to={parentPath} state={location.state} relative="path">
            <ChevronLeftIcon color="primary" />
          </Link>
        )}
      </Left>
      <Right />
    </StyledHeader>
  );
};

export default Header;
