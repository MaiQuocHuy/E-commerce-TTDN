import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";
import "../../styles/vendor.css";
import "../../styles/utility.css";
import "../../styles/app.css";
import { Toaster } from "react-hot-toast";

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
      <div className="preloader">
        <div className="preloader__wrap">
          <img
            className="preloader__img"
            //   src="images/preloader.png"
          />
        </div>
      </div>
      <div id="app">
        <Toaster />
        <Header />
        <div className="app-content">{children}</div>
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
