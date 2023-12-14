import React from "react";
import styles from "./Navbar.module.css";
import LightLogo from "../assets/images/logo-light.png";
import DarkLogo from "../assets/images/logo-dark.png";
import { ShoppingCart, Settings, LogIn, User } from "react-feather";
import "../assets/sass/_topbar.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  const userType = localStorage.getItem("userType");
  const token = localStorage.getItem("token");
  return (
    <header id="topnav" className="defaultscroll sticky mb-5">
      <div className="container">
        <div>
          <Link className="logo" to={""}>
            <span className="logo-light-mode">
              <img src={DarkLogo} className="l-dark" height={60} />
              <img src={LightLogo} className="l-light" height={60} />
            </span>
            <img src={LightLogo} height={60} className="logo-dark-mode" />
          </Link>
        </div>
        <div className="menu-extras">
          <div className="menu-item">
            <a className="navbar-toggle" id="isToggle" onclick="toggleMenu()">
              <div className="lines">
                <span />
                <span />
                <span />
              </div>
            </a>
          </div>
        </div>
        <ul className="buy-button list-inline mb-0">
          {token ? (
            <li className="list-inline-item ps-1 mb-0">
              <Link to={`/${userType}/profile`}>
                <div className="login-btn-primary">
                  <span className="btn btn-icon btn-pills btn-primary">
                    <User />
                  </span>
                </div>

                <div className="login-btn-light">
                  <span className="btn btn-icon btn-pills btn-light">
                    <User />
                  </span>
                </div>
              </Link>
            </li>
          ) : (
            <li className="list-inline-item mb-0">
              <Link
                to={"/users/login"}
                // data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <div className="login-btn-primary">
                  <span className="btn btn-icon btn-pills btn-soft-primary">
                    <LogIn />
                  </span>
                </div>
                <div className="login-btn-light">
                  <span className="btn btn-icon btn-pills btn-light">
                    <LogIn />
                  </span>
                </div>
              </Link>
            </li>
          )}
        </ul>
        <div id="navigation">
          <ul className="navigation-menu nav-light">
            <li>
              <Link to={""} className="sub-menu-item">
                Home
              </Link>
            </li>
            <li>
              <Link to={"trainers"} href="#" className="sub-menu-item">
                {" "}
                Trainers
              </Link>
            </li>
            <li>
              <Link to={"BMI"} className="sub-menu-item">
                BMI Calculator
              </Link>
            </li>

            {/* <li className="has-submenu parent-parent-menu-item">
              <a href="/user/searchForMore">Nutrition & Exercises</a>
            </li> */}
            <li className="has-submenu parent-parent-menu-item">
              <a href="#">Pages</a>
              <span className="menu-arrow" />
              <ul className="submenu">
                <li>
                  <a href="corporate-team.html" className="sub-menu-item">
                    {" "}
                    Team
                  </a>
                </li>
                <li>
                  <a href="corporate-pricing.html" className="sub-menu-item">
                    Pricing
                  </a>
                </li>
                <li className="has-submenu parent-menu-item">
                  <a href="#"> Blog </a>
                  <span className="submenu-arrow" />
                  <ul className="submenu">
                    <li>
                      <a href="corporate-blog.html" className="sub-menu-item">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="corporate-blog-detail.html"
                        className="sub-menu-item"
                      >
                        Blog Detail
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to={"/trainers/register"}
                href="corporate-services.html"
                className="sub-menu-item text-danger"
              >
                {!token ? "Become A Trainer" : null}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
