import Header from '@/layouts/Header';
import Main from '@/layouts/Main';
import { Outlet } from 'react-router-dom';

function Root() {
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
