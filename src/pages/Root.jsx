import { Outlet, Link } from "react-router-dom";

function Root() {
  return (
    <>
      <h1>This is Root page</h1>

      <div>
        <Link to={"login"}>Go to Login</Link>
      </div>

      <div>
        <Link to={"dashboard"}>Go to Dashboard</Link>
      </div>
      <Outlet />
    </>
  );
}

export default Root;
