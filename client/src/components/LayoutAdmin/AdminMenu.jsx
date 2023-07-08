import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <NavLink
          to="/admindashboard-page"
          className="brand-link"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <span className="brand-text font-weight-light">Shop-Huy</span>
        </NavLink>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user (optional) */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
								with font-awesome or any other icon font library */}
              <li className="nav-item">
                <NavLink to="/admin/dashboard-page" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/branch-page" className="nav-link">
                  <i className="nav-icon fas fa-file-alt" />
                  <p>Branch</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/product-page" className="nav-link">
                  <i className="nav-icon fas fa-tag" />
                  <p>Products</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/order-page" className="nav-link">
                  <i className="nav-icon fas fa-shopping-bag" />
                  <p>Orders</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/revenue-page" className="nav-link">
                  <i className="nav-icon fas fa-chart-line"></i>
                  <p>Revenue</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/discount-page" className="nav-link">
                  <i className="nav-icon  fa fa-percent" aria-hidden="true" />
                  <p>Discount</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/user-page" className="nav-link">
                  <i className="nav-icon  fas fa-users" />
                  <p>Users</p>
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </>
  );
};

export default AdminMenu;
