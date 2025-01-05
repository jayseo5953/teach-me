import { styled } from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';

const StyledHeader = styled.header`
  height: ${({ theme }) => theme.sizes.headerHeight};
  padding: 24px;
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  box-sizing: border-box;
`;

const HeaderItem = styled.div`
  z-index: 1;
  flex: 1;
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent || 'center'};
`;

const routesToHideBackButtons = [
  '/chat',
  '/chat/post-chat',
  '/sign-up',
  '/dashboard',
  '/login',
  '/select-student',
];
const routesToHideHeader = ['/chat'];

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isRoot = location.pathname === '/';
  const parentPath = location.pathname.split('/').slice(0, -1).join('/') || '/';
  const hideBackButton =
    isRoot || routesToHideBackButtons.includes(location.pathname);

  const hideHeader = routesToHideHeader.includes(location.pathname);

  return (
    !hideHeader && (
      <StyledHeader>
        <HeaderItem $justifyContent={'flex-start'}>
          {!hideBackButton && (
            <Link to={parentPath} state={location.state} relative="path">
              <ChevronLeftIcon color="primary" />
            </Link>
          )}
        </HeaderItem>
        <HeaderItem>
          <Logo />
        </HeaderItem>
        <HeaderItem $justifyContent={'flex-end'}>
          {user && <Button onClick={() => logout()}>Logout</Button>}
        </HeaderItem>
      </StyledHeader>
    )
  );
};

export default Header;
