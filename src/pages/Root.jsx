import Header from '@/layouts/Header';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <>
      <Header />
      <h1>This is Root</h1>
      <Outlet />
    </>
  );
}

export default Root;
