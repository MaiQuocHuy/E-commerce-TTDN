import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import BASE_URL from "../../config";
import { Link } from "react-router-dom";

const DashboardProfilePage = () => {
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState({});

  const getInfo = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/auth/info-user`,
        {
          id: auth?.user?._id,
        }
      );
      if (data?.success) {
        setUser(data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getInfo();
    }
  }, [auth?.token]);

  return (
    <>
      <Layout title={"Dash Board Profile"}>
        <UserMenu>
          <div className="col-lg-9 col-md-12">
            <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
              <div className="dash__pad-2">
                <h1 className="dash__h1 u-s-m-b-14">My Profile</h1>
                <span className="dash__text u-s-m-b-30">
                  Look all your info, you could customize your profile.
                </span>
                <div className="row">
                  <div className="col-lg-4 u-s-m-b-30">
                    <h2 className="dash__h2 u-s-m-b-8">Full Name</h2>
                    <span className="dash__text">{user?.name}</span>
                  </div>
                  <div className="col-lg-4 u-s-m-b-30">
                    <h2 className="dash__h2 u-s-m-b-8">E-mail</h2>
                    <span className="dash__text">{user?.email}</span>
                  </div>
                  <div className="col-lg-4 u-s-m-b-30">
                    <h2 className="dash__h2 u-s-m-b-8">Phone</h2>
                    <span className="dash__text">
                      {user?.phone || "Please enter your mobile phone"}
                    </span>
                  </div>
                  <div className="col-lg-4 u-s-m-b-30">
                    <h2 className="dash__h2 u-s-m-b-8">Address</h2>
                    <span className="dash__text">
                      {user?.address || "Please enter your address"}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="u-s-m-b-16">
                      <Link
                        className="dash__custom-link btn--e-transparent-brand-b-2"
                        to="/user/editprofile-page"
                      >
                        Edit Profile
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="dash__custom-link btn--e-brand-b-2"
                        to="/user/updatepassword-page"
                      >
                        Change Password
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UserMenu>
      </Layout>
    </>
  );
};

export default DashboardProfilePage;
