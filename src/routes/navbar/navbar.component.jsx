import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "./navbar.styles.scss";
const Navbar = () => {
  return (
    <>
      <div className='navbar-container'>
        <div className='logo-container'>
          <h1>Quiz Master</h1>
        </div>
        <div className='links-container'>
          <span>
            <Link to={"about"}>About me</Link>
          </span>
          <span>
            <Link to={"leaderboard"}>leaderboard</Link>
          </span>
          <span>
            <button className='sign-up-button'>sign in</button>
          </span>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
