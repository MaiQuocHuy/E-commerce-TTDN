import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Spinner = ({ path }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  console.log(path);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    // custom hook to get the current pathname in React
    count === 0 &&
      navigate(`${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center spin-container"
        style={{ height: "100vh" }}
      >
        {/* <div className="spinner-border" role="status"></div> */}
        <Spin indicator={antIcon} size="large" />
        <h3>Redirecting to you in {count} second </h3>
      </div>
    </>
  );
};

export default Spinner;
