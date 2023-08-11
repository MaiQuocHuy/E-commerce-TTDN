/* eslint-disable react/no-unescaped-entities */
import { Routes, Route } from "react-router-dom";
import AdminBranch from "./pages/admin/AdminBranch";
import AdminOrder from "./pages/admin/AdminOrder";
import AdminPayment from "./pages/admin/AdminPayment";
import AdminUser from "./pages/admin/AdminUser";
import AdminRevenue from "./pages/admin/AdminRevenue";
import OrderDetail from "./pages/admin/OrderDetail";
import CreateProduct from "./pages/admin/CreateProduct";
import CreateBranch from "./pages/admin/CreateBranch";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProduct from "./pages/admin/AdminProduct";
import Login from "./pages/admin/Auth/Login";
import UpdateBranch from "./pages/admin/UpdateBranch";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/user/CheckoutPage";
import Dashboard from "./pages/user/Dashboard";
import DashboardProfilePage from "./pages/user/DashboardProfilePage";
import DashboardMyOrder from "./pages/user/DashboardMyOrder";
import WishlistPage from "./pages/user/WishlistPage";
import SigninPage from "./pages/Auth/SigninPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgotpasswordPage from "./pages/Auth/ForgotpasswordPage";
import UpdateProduct from "./pages/admin/UpdateProduct";
import AdminRoute from "./components/Routes/AdminRoute";
import Private from "./components/Routes/Private";
import CreatePayment from "./pages/admin/CreatePayment";
import UpdatePayment from "./pages/admin/UpdatePayment";
import ManageMyOrder from "./pages/user/ManageMyOrder";
import DashboardMyPassword from "./pages/user/DashboardMyPassword";
import EditProfile from "./pages/user/EditProfile";
import UpdatePassword from "./pages/user/UpdatePassword";
import SearchPage from "./pages/user/SearchPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop-page" element={<ShopPage />} />
        <Route
          path="/product-detail-page/:slug"
          element={<ProductDetailPage />}
        />
        <Route path="/cart-page" element={<CartPage />} />
        <Route path="/signin-page" element={<SigninPage />} />
        <Route path="/signup-page" element={<SignupPage />} />
        <Route path="/forgotpassword-page" element={<ForgotpasswordPage />} />
        <Route path="/product/search" element={<SearchPage />} />
        <Route path="/user" element={<Private />}>
          <Route path="dashboard-page" element={<Dashboard />} />
          <Route
            path="dashboardprofile-page"
            element={<DashboardProfilePage />}
          />
          <Route
            path="dashboardmypassword-page"
            element={<DashboardMyPassword />}
          />

          <Route path="dashboardmyorder-page" element={<DashboardMyOrder />} />
          <Route path="checkout-page" element={<CheckoutPage />} />
          <Route path="wishlist-page" element={<WishlistPage />} />
          <Route
            path="managemyorder-page/:orderId"
            element={<ManageMyOrder />}
          />
          <Route path="editprofile-page" element={<EditProfile />} />
          <Route path="updatepassword-page" element={<UpdatePassword />} />
        </Route>
        <Route path="/admin/login-page" element={<Login />} />
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard-page" element={<AdminDashboard />} />
          <Route path="product-page" element={<AdminProduct />} />
          <Route path="branch-page" element={<AdminBranch />} />
          <Route path="order-page" element={<AdminOrder />} />
          <Route path="payment-page" element={<AdminPayment />} />
          <Route path="user-page" element={<AdminUser />} />
          <Route path="revenue-page" element={<AdminRevenue />} />
          <Route path="orderdetail-page/:id" element={<OrderDetail />} />
          <Route path="createproduct-page" element={<CreateProduct />} />
          <Route path="createbranch-page" element={<CreateBranch />} />
          <Route path="createpayment-page" element={<CreatePayment />} />
          <Route path="updatebranch-page/:id" element={<UpdateBranch />} />
          <Route path="updatepayment-page/:id" element={<UpdatePayment />} />
          <Route path="updateproduct-page/:slug" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
