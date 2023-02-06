import { useDispatch, useSelector } from "react-redux";
import { setIsActive } from "../../utils/store/features/modal/modal-slice";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { userSignOut } from "../../utils/firebase/firebase.utils";
import "./navbar.styles.scss";
const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dispatchHandler = () => dispatch(setIsActive("sign in"));
  const signOutHandler = async () => {
    try {
      await userSignOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='navbar-container'>
        <div className='logo-container'>
          <h1>
            <Link to='/'>Quiz Master</Link>
          </h1>
        </div>
        <div className='links-container'>
          <span>
            <Link to={"about"}>About me</Link>
          </span>
          <span>
            <Link to={"leaderboard"}>leaderboard</Link>
          </span>
          <span>
            {/* use Button */}

            {user ? (
              <button
                onClick={signOutHandler}
                className='sign-up-button'
              >
                sign out
              </button>
            ) : (
              <button
                onClick={dispatchHandler}
                className='sign-up-button'
              >
                sign in
              </button>
            )}
          </span>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
