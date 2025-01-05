import Header from '@/layouts/Header';
import Main from '@/layouts/Main';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, pathname]);

  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default Root;
