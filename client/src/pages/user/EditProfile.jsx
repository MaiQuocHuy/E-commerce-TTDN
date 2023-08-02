/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import BASE_URL from "../../config";
import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const EditProfile = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [streetAddress, setStreetAddress] = useState("");
  const HOST = "https://provinces.open-api.vn/api/";

  const callDataProvince = async () => {
    try {
      const response = await fetch(
        "https://provinces.open-api.vn/api/?depth=1"
      );
      //Array Province
      const arrayData = await response.json();
      setProvinces(arrayData);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const callDataDistrict = async (key, option) => {
    try {
      setStreetAddress(option.children);
      const apiDistrict = `${HOST}p/${key}?depth=2`;
      console.log(apiDistrict);
      const response = await fetch(apiDistrict);
      //Array Province
      const arrayDataDistrict = await response.json();
      setDistricts(arrayDataDistrict.districts);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const callDataWards = async (key, option) => {
    try {
      setStreetAddress(`${streetAddress},${option.children}`);
      const apiWard = `${HOST}d/${key}?depth=2`;
      console.log(apiWard);
      const response = await fetch(apiWard);
      const arrayDataWards = await response.json();
      setWards(arrayDataWards.wards);
    } catch (error) {
      console.log(error);
      toast.error(error);
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
        setName(data?.user?.name);
        setPhone(data?.user?.phone);
        setEmail(data?.user?.email);
        if (data?.user?.address != "")
          setAddress(data?.user?.address?.split(","));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWardText = async (key, option) => {
    try {
      console.log(key);
      console.log(option.children);
      setStreetAddress(`${streetAddress},${option.children}`);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleSave = async (e) => {
    try {
      e.preventDefault();
      console.log(name, streetAddress, phone, email);
      if (!validateEmail(email)) {
        return toast.error("Email not correct format");
      }
      if (!validatePhone(phone)) {
        return toast.error("Phone not correct format just 10 digits");
      }
      const { data } = await axios.put(
        `${BASE_URL}/api/e-commerce/auth/user-auth/update-profile`,
        {
          name,
          email,
          phone,
          address: streetAddress,
        }
      );

      if (data?.success) {
        toast.success("Save Successfully");
        console.log(data?.updateUser);
        navigate("/user/dashboardprofile-page");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  function validateEmail(email) {
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    return phoneRegex.test(phone);
  }

  useEffect(() => {
    if (auth?.token) {
      getInfo();
      callDataProvince();
    }
  }, [auth?.token]);
  // console.log(user);

  return (
    <>
      <Layout title={"Edit - Profile"}>
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
                      <div className="gl-inline">
                        <div className="u-s-m-b-30">
                          <label className="gl-label" htmlFor="reg-fname">
                            Full Name *
                          </label>
                          <input
                            className="input-text input-text--primary-style"
                            type="text"
                            id="reg-fname"
                            placeholder="Name"
                            value={name}
                            style={{ fontSize: "16px !important" }}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="u-s-m-b-30">
                          {/*====== Date of Birth Select-Box ======*/}
                          <span className="gl-label">Province</span>
                          <div className="gl-dob">
                            <Select
                              bordered={true}
                              placeholder="Select a province"
                              size="large"
                              defaultValue={"Choose Province"}
                              showSearch
                              value={
                                address.length != 0 ? address[0] : undefined
                              }
                              onChange={(key, option) => {
                                callDataDistrict(key, option);
                              }}
                            >
                              {provinces.length != 0 &&
                                provinces.map((item) => (
                                  <Option key={item.code} value={item.code}>
                                    {item.name}
                                  </Option>
                                ))}
                            </Select>
                          </div>
                          {/*====== End - Date of Birth Select-Box ======*/}
                        </div>
                      </div>
                      <div className="gl-inline">
                        <div className="u-s-m-b-30">
                          {/*====== Date of Birth Select-Box ======*/}
                          <span className="gl-label">District</span>
                          <div className="gl-dob">
                            <Select
                              bordered={true}
                              placeholder="Select a district"
                              size="large"
                              showSearch
                              value={
                                address.length != 0 ? address[1] : undefined
                              }
                              defaultValue={"Choose District"}
                              onChange={(key, option) => {
                                callDataWards(key, option);
                              }}
                            >
                              {districts?.map((item) => (
                                <Option key={item.code} value={item.code}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </div>
                          {/*====== End - Date of Birth Select-Box ======*/}
                        </div>
                        <div className="u-s-m-b-30">
                          <label className="gl-label" htmlFor="gender">
                            Wards
                          </label>
                          <div className="gl-dob">
                            <Select
                              bordered={true}
                              placeholder="Select a ward"
                              size="large"
                              defaultValue={"Choose ward"}
                              showSearch
                              value={
                                address.length != 0 ? address[2] : undefined
                              }
                              onChange={(key, option) => {
                                getWardText(key, option);
                              }}
                            >
                              {wards?.map((item) => (
                                <Option key={item.code} value={item.code}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div className="gl-inline">
                        <div className="u-s-m-b-30">
                          <h2 className="dash__h2 u-s-m-b-8">Street Address</h2>
                          <input
                            className="input-text input-text--primary-style"
                            type="text"
                            id="reg-fname"
                            placeholder="Street Address"
                            value={address.length != 0 ? address[3] : undefined}
                            onBlur={(e) => {
                              setStreetAddress(
                                `${streetAddress},${e.target.value}`
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="gl-inline">
                        <div className="u-s-m-b-30">
                          <h2 className="dash__h2 u-s-m-b-8">E-mail</h2>
                          <input
                            className="input-text input-text--primary-style"
                            type="email"
                            id="reg-fname"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                              setEmail(`${e.target.value}`);
                            }}
                          />
                        </div>
                        <div className="u-s-m-b-30">
                          <h2 className="dash__h2 u-s-m-b-8">Phone</h2>
                          <input
                            className="input-text input-text--primary-style"
                            type="text"
                            id="reg-phone"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => {
                              setPhone(`${e.target.value}`);
                            }}
                          />
                        </div>
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

export default EditProfile;
