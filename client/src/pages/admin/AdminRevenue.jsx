import Layout from "../../components/LayoutAdmin/Layout";

import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart as ChartpieJS, ArcElement } from "chart.js";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../../config";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
ChartpieJS.register(ArcElement, Tooltip, Legend);

const AdminRevenue = () => {
  const [dataByYear, setDataByYear] = useState([]);
  const [dataMonthByYear, setDataMonthByYear] = useState([]);
  const [dataByDay, setDataByDay] = useState([]);

  const [productSoldOut, setProductSoldOut] = useState([]);
  const [productSoldOutMonth, setProductSoldOutMonth] = useState([]);
  const [productSoldOutDay, setProductSoldOutDay] = useState([]);

  const getTotalMoneyFollowYear = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-totalmoney-follow-year`
      );
      console.log(data);
      if (data?.success) {
        setDataByYear(data?.totalmoneyfollowYear);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const getTotalMoneyMonthFollowYear = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-totalmoneymonth-follow-year`
      );
      console.log(data);
      if (data?.success) {
        setDataMonthByYear(data?.totalMonthFollowYear);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const data = {
    labels: dataByYear.length != 0 && dataByYear?.map((item) => item.year),
    datasets: [
      {
        label: "Year",
        data:
          dataByYear.length != 0 &&
          dataByYear?.map((item) => parseFloat(item.totalMoney)),
        backgroundColor: "rgba(144, 194, 231)",
      },
    ],
  };

  const dataDay = {
    labels: dataByDay.length != 0 && dataByDay?.map((item) => item._id),
    datasets: [
      {
        label: "Day",
        data:
          dataByDay.length != 0 &&
          dataByDay?.map((item) => parseFloat(item.totalMoney)),
        backgroundColor: "rgba(144, 194, 231)",
      },
    ],
  };

  const numSlices = productSoldOut.length || 0;
  const backgroundColors = generateColors(numSlices);
  const borderColors = generateBorderColors(backgroundColors);

  const dataPie = {
    labels:
      productSoldOut.length != 0 &&
      productSoldOut?.map((item) => {
        return item._id;
      }),
    datasets: [
      {
        label: "Price Product",
        data:
          productSoldOut.length != 0 &&
          productSoldOut?.map((item) => {
            return item.totalmoney;
          }),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const dataMonth = {
    labels:
      dataMonthByYear.length != 0 && dataMonthByYear?.map((item) => item.month),
    datasets: [
      {
        label: "Month",
        data:
          dataMonthByYear.length != 0 &&
          dataMonthByYear?.map((item) => parseFloat(item.totalMoney)),
        backgroundColor: "rgba(144, 194, 231)",
      },
    ],
  };

  const dataPieMonth = {
    labels:
      productSoldOutMonth.length != 0 &&
      productSoldOutMonth?.map((item) => {
        return item._id;
      }),
    datasets: [
      {
        label: "Price Product",
        data:
          productSoldOutMonth.length != 0 &&
          productSoldOutMonth?.map((item) => {
            return item.totalmoney;
          }),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        //["rgba(255, 99, 132, 1)"], ["rgba(255, 99, 132, 0.6)"]
      },
    ],
  };

  const getProductSoldout = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-product-soldout`
      );
      console.log(data);
      if (data?.success) {
        setProductSoldOut(data?.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const getProductMonthSoldout = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-product-soldout-month`
      );
      console.log(data);
      if (data?.success) {
        setProductSoldOutMonth(data?.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const getProductDaySoldout = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-product-soldout-day`
      );
      console.log(data);
      if (data?.success) {
        setProductSoldOutDay(data?.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const getTotalMoneyFollowDay = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-totalmoney-follow-day`
      );
      console.log(data);
      if (data?.success) {
        setDataByDay(data?.result);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const dataPieDay = {
    labels:
      productSoldOutDay.length != 0 &&
      productSoldOutDay?.map((item) => {
        return item._id;
      }),
    datasets: [
      {
        label: "Price Product",
        data:
          productSoldOutDay.length != 0 &&
          productSoldOutDay?.map((item) => {
            return item.totalmoney;
          }),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    getTotalMoneyFollowYear();
    getProductSoldout();
    getTotalMoneyMonthFollowYear();
    getProductMonthSoldout();
    getTotalMoneyFollowDay();
    getProductDaySoldout();
  }, []);

  const option = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
    },
  };

  function generateColors(numColors) {
    const colors = [];
    const hueStep = 360 / numColors;

    for (let i = 0; i < numColors; i++) {
      const hue = i * hueStep;
      const color = `hsla(${hue}, 70%, 50%, 0.6)`; // Adjust the saturation and lightness as needed
      colors.push(color);
    }

    return colors;
  }

  function generateBorderColors(backgroundColors) {
    const borderColors = backgroundColors.map((color) => {
      // Convert the background color to RGBA and reduce the alpha value
      const rgbaColor = color.replace("hsla", "rgba").replace(", 0.6)", ", 1)");
      return rgbaColor;
    });

    return borderColors;
  }

  return (
    <>
      <Layout title={"Admin - Revenue"}>
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="center-item-revenue">Revenue By Year</div>
              <div className="row">
                <div className="col-md-6">
                  <Bar data={data} />
                </div>
                <div
                  className="col-md-6 pie-chart-container"
                  style={{
                    height: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pie data={dataPie} options={option} />
                </div>
              </div>
              <div className="center-item-revenue">Revenue By Month</div>
              <div className="row">
                <div className="col-md-6">
                  <Bar data={dataMonth} />
                </div>
                <div
                  className="col-md-6 pie-chart-container"
                  style={{
                    height: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pie data={dataPieMonth} options={option} />
                </div>
              </div>
              <div className="center-item-revenue">Revenue By Day</div>
              <div className="row">
                <div className="col-md-6">
                  <Bar data={dataDay} />
                </div>
                <div
                  className="col-md-6 pie-chart-container"
                  style={{
                    height: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pie data={dataPieDay} options={option} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default AdminRevenue;
