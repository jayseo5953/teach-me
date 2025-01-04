import { Outlet, useMatch } from 'react-router-dom';
import Link from '@/components/ui/Link';

const SelectStudent = () => {
  const isCurrentRoute = useMatch('/pre-chat');

  return (
    <div>
      {isCurrentRoute && <Link to="select-topic">Go to topic options</Link>}
      <Outlet />
    </div>
  );
};

export default SelectStudent;
