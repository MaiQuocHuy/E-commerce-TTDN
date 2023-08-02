/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import BASE_URL from "../../config";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmnewpassword, setConfirmnewpassword] = useState("");
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useAuth();

  const handleSave = async (e) => {
    console.log("Davao");
    e.preventDefault();
    try {
      if (!oldpassword) {
        toast.error("Oldpassword is empty");
        return;
      }
      if (!newpassword) {
        toast.error("newpassword is empty");
        return;
      }
      if (!confirmnewpassword) {
        toast.error("confirmnewpassword is empty");
        return;
      }
      if (confirmnewpassword != newpassword) {
        toast.error("confirmnewpassword not match newpassword");
        return;
      }
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/auth/update-password`,
        {
          email,
          password: newpassword,
        }
      );
      if (data?.success) {
        toast.success("Update Password successfully");
        navigate("/user/dashboardprofile-page");
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getInfo = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/auth/info-user`,
        {
          id: auth?.user?._id,
        }
      );
      if (data?.success) {
        setEmail(data?.user?.email);
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
      <Layout title={"Update - Password"}>
        <UserMenu>
          <div className="col-lg-9 col-md-12">
            <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
              <div className="dash__pad-2">
                <h1 className="dash__h1 u-s-m-b-14">Edit Profile</h1>
                <span className="dash__text u-s-m-b-30">
                  Looks like you haven't update your profile
                </span>

                <div className="row">
                  <div className="col-lg-12">
                    <form className="dash-edit-p">
                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-fname">
                          Old Password *
                        </label>
                        <input
                          className="input-text input-text--primary-style"
                          type="password"
                          id="reg-fname"
                          placeholder="Old Password"
                          value={oldpassword}
                          onChange={(e) => setOldpassword(e.target.value)}
                          style={{ fontSize: "16px !important" }}
                        />
                      </div>
                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-fname">
                          New Password *
                        </label>
                        <input
                          className="input-text input-text--primary-style"
                          type="password"
                          id="reg-fname"
                          value={newpassword}
                          onChange={(e) => setNewpassword(e.target.value)}
                          placeholder="New Password"
                          style={{ fontSize: "16px !important" }}
                        />
                      </div>
                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-fname">
                          Confirm New Password *
                        </label>
                        <input
                          className="input-text input-text--primary-style"
                          type="password"
                          id="reg-fname"
                          value={confirmnewpassword}
                          onChange={(e) =>
                            setConfirmnewpassword(e.target.value)
                          }
                          placeholder="Confirm New Password"
                          style={{ fontSize: "16px !important" }}
                        />
                      </div>
                      <button
                        className="btn btn--e-brand-b-2"
                        type="submit"
                        onClick={(e) => handleSave(e)}
                      >
                        SAVE
                      </button>
                    </form>
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

export default UpdatePassword;
