import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import BASE_URL from "../../config";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [activeTabAdmin, setActiveTabAdmin] = useState(false);
  const [user, setUser] = useState({});

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  const handleDropdown = () => {
    console.log(activeTabAdmin);
    setActiveTabAdmin(!activeTabAdmin);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/auth/info-user`,
        {
          id: auth?.user?._id,
        }
      );
      console.log(data);
      if (data?.success) {
        setUser(data?.user);
      }
    };
    if (auth?.token) {
      fetchData();
    }
  }, [auth?.token]);

  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <div className="navbar-nav pl-2"></div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <div className="nav-link p-0 pr-3" onClick={handleDropdown}>
              <img
                src="https://cdn.dribbble.com/userupload/4727563/file/original-c10286f525387d0468677c1fd18a1f30.png?resize=1600x1200"
                className="img-circle elevation-2"
                width={40}
                height={40}
                alt
              />
            </div>
            <div
              className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-3"
              style={{ display: activeTabAdmin ? "block" : "none" }}
            >
              <h4 className="h4 mb-0">
                <strong>{user?.name}</strong>
              </h4>
              <div className="mb-3">{user?.email}</div>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-user-cog mr-2" /> Settings
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-lock mr-2" /> Change Password
              </a>
              <div className="dropdown-divider" />
              <Link
                onClick={handleLogout}
                to="/admin/login-page"
                className="dropdown-item text-danger"
              >
                <i className="fas fa-sign-out-alt mr-2" /> Logout
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
