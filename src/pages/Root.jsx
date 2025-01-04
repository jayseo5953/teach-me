import Header from '@/layouts/Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``;

function Root() {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default Root;
