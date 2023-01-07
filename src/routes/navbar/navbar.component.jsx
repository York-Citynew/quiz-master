import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "./navbar.styles.scss";
const Navbar = () => {
  return (
    <>
      <div className='navbar-container'>
        <h1>Quiz Master</h1>
        <span>
          <Link to={"about"}>About me</Link>
        </span>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
