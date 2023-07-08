import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "../../styles/adminlte.min.css";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Header from "./Header";
import AdminMenu from "./AdminMenu";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <div className="wrapper">
        <Toaster />
        <Header />
        <AdminMenu />
        {children}
        <Footer />
      </div>
    </>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "Good Job",
  keywords: "mern,react,node,mongodb",
  author: "Huy",
};

export default Layout;
