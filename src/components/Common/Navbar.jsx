import { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import mainLogo from "../../assets/mainLogo.png";
import { AuthContext } from "../../provider/AuthProvider";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  // const history = useHistory()
  const location = useLocation();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const handleTheme = (e) => {
    const value = e.target.value;
    console.log(value);
    setTheme(value);
  };

  const handleLogOut = () => {
    logOut()
      .then((res) => {
        console.log(res, "logged out");
        location.pathname = "/";
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  const navList = (
    <>
      <li>
        <NavLink to="/">
          Home
        </NavLink>
      </li>

      {user ? (
        <li>
          <NavLink to={`/myLifeTimeSubmission`}>
            My submission list
          </NavLink>
        </li>
      ) : null}
      {user ? null : (
        <li>
          <NavLink to="/signin">Sign In</NavLink>
        </li>
      )}
      {user ? null : (
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      )}
      {user ? (
        <li>
          <button onClick={handleLogOut}>Logout</button>
        </li>
      ) : null}
      
    </>
  );
  return (
    <div className="navbar bg-base-100 sticky top-0">
      <div className="navbar-start">
        
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navList}
          </ul>
        </div>
        <img src={mainLogo} className=" w-32 md:w-48" alt="" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 [&>li]:p-2">{navList}</ul>
      </div>
      <div className="navbar-end">
        {/* theme controller */}
        <div className="dropdown pr-2 md:pr-24">
          <div tabIndex={0} role="button" className="btn m-1 rounded-sm w-20 h-6 lg:w-24">
            Theme
            <svg
              width="12px"
              height="12px"
              className="h-2 w-2 fill-current opacity-60 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-sm w-[6.5rem]"
          >
            <li>
              <input
                type="radio"
                onClick={handleTheme}
                name="theme-dropdown"
                className="theme-controller rounded-sm  btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Dark"
                value="dark"
              />
            </li>
            <li>
              <input
                type="radio"
                onClick={handleTheme}
                name="theme-dropdown"
                className="theme-controller rounded-sm btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Light"
                value="light"
              />
            </li>
            <li>
              <input
                type="radio"
                onClick={handleTheme}
                name="theme-dropdown"
                className="theme-controller rounded-sm btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Night"
                value="night"
              />
            </li>
            <li>
              <input
                type="radio"
                onClick={handleTheme}
                name="theme-dropdown"
                className="theme-controller rounded-sm btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Wireframe"
                value="wireframe"
              />
            </li>
          </ul>
        </div>
        {user ? (
          <div className="flex gap-4 justify-center items-center px-0 md:px-4">
            {user?.photoURL ? (
              <img
                className="w-12 h-12 rounded-full"
                src={user.photoURL}
                alt=""
              />
            ) : (
              <FaUserCircle className="w-12 h-12" />
            )}
            <div className="hidden  md:block">{user?.displayName}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
