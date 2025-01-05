import { Outlet, useMatch } from 'react-router-dom';

const HideParentRoute = ({ matchPath, PageComponent }) => {
  const isCurrentRoute = useMatch(matchPath);

  return (
    <div>
      {/* Render conditional content if the path matches */}
      {isCurrentRoute && PageComponent}

      {/* Render nested route content */}
      <Outlet />
    </div>
  );
};

export default HideParentRoute;
