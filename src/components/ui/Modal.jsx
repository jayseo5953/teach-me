import Sheet from '@/components/ui/Sheet';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: 0.6;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: black;
`;

const Content = styled(Sheet)`
  z-index: 102;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  min-height: 50%;
`;

const Modal = ({ children, ...props }) => {
  return (
    <div>
      <Overlay />
      <Content {...props}>{children}</Content>
    </div>
  );
};

export default Modal;
