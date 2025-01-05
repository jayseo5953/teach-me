import { Outlet, useMatch } from 'react-router-dom';

const SelectStudent = () => {
  const isCurrentRoute = useMatch('/pre-chat');

  return (
    <div>
      {isCurrentRoute && 'Some content'}
      <Outlet />
    </div>
  );
};

export default SelectStudent;
