import React from "react";
import styles from "./UserProfile.module.css";
import bg from "../assets/account/bg.png";
import clientPhoto from "../assets/client/01.jpg";
import Circleci from "../assets/images/job/Circleci.svg";
import Gitlabb from "../assets/images/job/Gitlab.svg";
import CodePen from "../assets/images/job/Codepen.svg";
import blog1 from "../assets/images/blog/01.jpg";
import blog2 from "../assets/images/blog/02.jpg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import {
  UserPlus,
  Users,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  GitHub,
  Youtube,
  Mail,
  Bookmark,
  Italic,
  Globe,
  Gift,
  MapPin,
  Phone,
  Gitlab,
} from "react-feather";
import axios from "axios";
export default function UserProfile() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  let firstName;
  //! Retrieve User Details
  const userDataQuery = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      let { data } = await axios.get("http://localhost:4000/userData");
      const userData = data.userData;
      console.log("USER DATA IN PROFILE", userData);
      localStorage.setItem("userData", JSON.stringify(userData));
      return userData;
    },
  });

  if (userDataQuery.isLoading) return <h1>Loading...</h1>;
  if (userDataQuery.isError)
    return <pre>{JSON.stringify(userDataQuery.error)}</pre>;

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    window.location.href = "/";
  };
  return (
    <div>
      {/* Hero Start */}
      <section
        className="bg-profile d-table w-100 bg-primary"
        style={{ background: `url(${bg})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="card public-profile border-0 rounded shadow"
                style={{ zIndex: 1 }}
              >
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-lg-2 col-md-3 text-md-start text-center">
                      <img
                        src={userDataQuery.data.picture}
                        className="avatar avatar-large rounded-circle shadow d-block mx-auto"
                      />
                    </div>
                    {/*end col*/}
                    <div className="col-lg-10 col-md-9">
                      <div className="row align-items-end">
                        <div className="col-md-7 text-md-start text-center mt-4 mt-sm-0">
                          <h3 className="title mb-0">
                            {userDataQuery.data.firstName}{" "}
                            {userDataQuery.data.lastName}
                          </h3>
                          <small className="text-muted h6 me-2">
                            {userDataQuery.data.title}
                          </small>
                          <ul className="list-inline mb-0 mt-3">
                            <li className="list-inline-item me-3">
                              <a
                                href=""
                                className="text-muted"
                                title="Instagram"
                              >
                                <Instagram className="me-1 mb-1" />
                                {userDataQuery.data.firstName}_
                                {userDataQuery.data.lastName}
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                href=""
                                className="text-muted mt-5
"
                                title="Linkedin"
                              >
                                <Linkedin className="me-1 mb-1" />
                                {userDataQuery.data.firstName}-
                                {userDataQuery.data.lastName}
                              </a>
                            </li>
                          </ul>
                        </div>
                        {/*end col*/}
                        <div className="col-md-5 text-md-end text-center">
                          <ul className="list-unstyled social-icon social mb-0 mt-4">
                            <li className="list-inline-item me-1">
                              <a
                                href=""
                                className="rounded"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title="Add Friend"
                              >
                                <i className="uil uil-user-plus align-middle" />
                              </a>
                            </li>
                            <li className="list-inline-item me-1">
                              <a
                                href=""
                                className="rounded"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title="Messages"
                              >
                                <i className="uil uil-comment align-middle" />
                              </a>
                            </li>
                            <li className="list-inline-item me-1">
                              <a
                                href=""
                                className="rounded"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title="Notifications"
                              >
                                <i className="uil uil-bell align-middle" />
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <Link
                                to={"/user/settings"}
                                className="rounded"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title="Settings"
                              >
                                <i className="uil uil-cog align-middle" />
                              </Link>
                            </li>
                          </ul>
                          {/*end icon*/}
                        </div>
                        {/*end col*/}
                      </div>
                      {/*end row*/}
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*ed container*/}
      </section>
      {/*end section*/}
      {/* Hero End */}
      {/* Profile Start */}
      <section className="section mt-60">
        <div className="container mt-lg-3">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 d-lg-block d-none">
              <div className="sidebar sticky-bar p-4 rounded shadow">
                <div className="widget">
                  <h5 className="widget-title">Stats :</h5>
                  <div className="row mt-4">
                    <div className="col-6 text-center">
                      <UserPlus className="text-primary" />
                      <h5 className="mb-0">2588</h5>
                      <p className="text-muted mb-0">Points</p>
                    </div>
                    {/*end col*/}
                    <div className="col-6 text-center">
                      <Users className="text-primary" />
                      <h5 className="mb-0">454</h5>
                      <p className="text-muted mb-0">Workouts</p>
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                </div>
                <div className="widget mt-4 pt-2">
                  <h5 className="widget-title">Progress :</h5>
                  <div className="progress-box mt-4">
                    <h6 className="title text-muted">Progress</h6>
                    <div className="progress">
                      <div
                        className="progress-bar position-relative bg-primary"
                        style={{ width: "50%" }}
                      >
                        <div className="progress-value d-block text-muted h6">
                          24 / 48
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end process box*/}
                </div>
                <div className="widget mt-4">
                  <ul
                    className="list-unstyled sidebar-nav mb-0"
                    id="navmenu-nav"
                  >
                    <li className="navbar-item account-menu px-0">
                      <Link
                        to={"/user/profile"}
                        className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                      >
                        <span className="h4 mb-0">
                          <i className="uil uil-dashboard" />
                        </span>
                        <h6 className="mb-0 ms-2">Profile</h6>
                      </Link>
                    </li>
                    <li className="navbar-item account-menu px-0 mt-2">
                      <a
                        href="account-members.html"
                        className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                      >
                        <span className="h4 mb-0">
                          <i className="uil uil-users-alt" />
                        </span>
                        <h6 className="mb-0 ms-2">Members</h6>
                      </a>
                    </li>
                    <li className="navbar-item account-menu px-0 mt-2">
                      <a
                        href="account-works.html"
                        className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                      >
                        <span className="h4 mb-0">
                          <i className="uil uil-file" />
                        </span>
                        <h6 className="mb-0 ms-2">Portfolio</h6>
                      </a>
                    </li>
                    <li className="navbar-item account-menu px-0 mt-2">
                      <Link
                        to={'/user/chatOfUser'}
                        className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                      >
                        <span className="h4 mb-0">
                          <i className="uil uil-comment" />
                        </span>
                        <h6 className="mb-0 ms-2">Chat</h6>
                      </Link>
                    </li>
                    <li className="navbar-item account-menu px-0 mt-2">
                      <Link
                        to={'/user/chatOfUser'}
                        className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                      >
                        <span className="h4 mb-0">
                          <i className="uil uil-envelope-star" />
                        </span>
                        <h6 className="mb-0 ms-2">Messages</h6>
                      </Link>
                    </li>
                    <li className="navbar-item account-menu px-0 mt-2">
                      <a
                        href="account-payments.html"
                        className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                      >
                        <span className="h4 mb-0">
                          <i className="uil uil-transaction" />
                        </span>
                        <h6 className="mb-0 ms-2">Payments</h6>
                      </a>
                    </li>
                    <li className="navbar-item account-menu px-0 mt-2">
                      <a className="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
                        <span className="h4 mb-0">
                          <i className="uil uil-setting" />
                        </span>
                        <h6 className="mb-0 ms-2">
                          <Link className="text-dark" to={"/user/settings"}>
                            Settings
                          </Link>
                        </h6>
                      </a>
                    </li>
                    <li className="navbar-item account-menu px-0 mt-2">
                      <a className="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
                        <span className="h4 mb-0">
                          <i className="uil uil-dashboard" />
                        </span>
                        <h6 className="mb-0 ms-2" onClick={Logout}>
                          Logout
                        </h6>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="widget mt-4 pt-2">
                  <h5 className="widget-title">Follow me :</h5>
                  <ul className="list-unstyled social-icon social mb-0 mt-4">
                    <li className="list-inline-item me-1">
                      <a href="" className="rounded">
                        <Facebook />
                      </a>
                    </li>
                    <li className="list-inline-item me-1">
                      <a href="" className="rounded">
                        <Instagram />
                      </a>
                    </li>
                    <li className="list-inline-item me-1">
                      <a href="" className="rounded">
                        <Twitter />
                      </a>
                    </li>
                    <li className="list-inline-item me-1">
                      <a href="" className="rounded">
                        <Linkedin />
                      </a>
                    </li>
                    <li className="list-inline-item me-1">
                      <a href="" className="rounded">
                        <GitHub />
                      </a>
                    </li>
                    <li className="list-inline-item me-1">
                      <a href="" className="rounded">
                        <Youtube />
                      </a>
                    </li>
                    <li className="list-inline-item me-1">
                      <a href="" className="rounded">
                        <Gitlab />
                      </a>
                    </li>
                  </ul>
                  {/*end icon*/}
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-8 col-12">
              <div className="border-bottom pb-4">
                <h5>
                  {userDataQuery.data.firstName} {userDataQuery.data.lastName}
                </h5>
                <p className="text-muted mb-0">
                  {userDataQuery.data.description}
                </p>
              </div>
              <div className="border-bottom pb-4">
                <div className="row">
                  <div className="col-md-6 mt-4">
                    <h5>Personal Details :</h5>
                    <div className="mt-4">
                      <div className="d-flex align-items-center">
                        <Mail className="me-3" />
                        <div className="flex-1">
                          <h6 className="text-primary mb-0">Email :</h6>
                          <a href="" className="text-muted">
                            {userDataQuery.data.email}
                          </a>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <Bookmark className="me-3" />
                        <div className="flex-1">
                          <h6 className="text-primary mb-0">Skills :</h6>
                          <a href="" className="text-muted">
                            **Placeholder**
                          </a>
                          ,{" "}
                          <a href="" className="text-muted">
                            **Placeholder**
                          </a>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <Italic className="me-3" />
                        <div className="flex-1">
                          <h6 className="text-primary mb-0">Language :</h6>
                          <a href="" className="text-muted">
                            **Placeholder**
                          </a>
                          ,{" "}
                          <a href="" className="text-muted">
                            **Placeholder**
                          </a>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <Globe className="me-3" />
                        <div className="flex-1">
                          <h6 className="text-primary mb-0">Website :</h6>
                          <a href="" className="text-muted">
                            www.{userDataQuery.data.firstName}
                            {userDataQuery.data.lastName}.com
                          </a>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <Gift className="me-3" />
                        <div className="flex-1">
                          <h6 className="text-primary mb-0">Birthday :</h6>
                          <p className="text-muted mb-0"> **Placeholder**</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <MapPin className="me-3" />
                        <div className="flex-1">
                          <h6 className="text-primary mb-0">Location :</h6>
                          <a href="" className="text-muted">
                            {userDataQuery.data.city},{" "}
                            {userDataQuery.data.country}
                          </a>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <Phone className="me-3" />
                        <div className="flex-1">
                          <h6 className="text-primary mb-0">Cell No :</h6>
                          <a href="" className="text-muted">
                            (+2) {userDataQuery.data.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-md-6 mt-4 pt-2 pt-sm-0">
                    <h5>Workout plans :</h5>
                    <div className="d-flex features feature-primary key-feature align-items-center p-3 rounded shadow mt-4">
                      <img src={Circleci} className="avatar avatar-ex-sm" />
                      <div className="flex-1 content ms-3">
                        <h4 className="title mb-0">Push, Pull, Leg</h4>
                        <p className="text-muted mb-0">3 days/week</p>
                        <p className="text-muted mb-0">
                          <a href="" className="read-more">
                            Beginner
                          </a>{" "}
                          @Muscle_Gains
                        </p>
                      </div>
                    </div>
                    <div className="d-flex features feature-primary key-feature align-items-center p-3 rounded shadow mt-4">
                      <img src={CodePen} className="avatar avatar-ex-sm" />
                      <div className="flex-1 content ms-3">
                        <h4 className="title mb-0">Classic Physique</h4>
                        <p className="text-muted mb-0">4 Days/week</p>
                        <p className="text-muted mb-0">
                          <a href="" className="read-more">
                            Intermediate
                          </a>{" "}
                          @Gym_Bros
                        </p>
                      </div>
                    </div>
                    <div className="d-flex features feature-primary key-feature align-items-center p-3 rounded shadow mt-4">
                      <img src={Gitlabb} className="avatar avatar-ex-sm" />
                      <div className="flex-1 content ms-3">
                        <h4 className="title mb-0">Special Forces training</h4>
                        <p className="text-muted mb-0">6 Days/week</p>
                        <p className="text-muted mb-0">
                          <a href="" className="read-more">
                            Advanced
                          </a>{" "}
                          @Beast_mode
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                </div>
                {/*end row*/}
              </div>
              <h5 className="mt-4 mb-0">Posts &amp; News :</h5>
              <div className="row">
                <div className="col-md-6 mt-4 pt-2">
                  <div className="card blog blog-primary rounded border-0 shadow">
                    <div className="position-relative">
                      <img src={blog1} className="card-img-top rounded-top" />
                      <div className="overlay rounded-top" />
                    </div>
                    <div className="card-body content">
                      <h5>
                        <a href="" className="card-title title text-dark">
                          Design your apps in your own way
                        </a>
                      </h5>
                      <div className="post-meta d-flex justify-content-between mt-3">
                        <ul className="list-unstyled mb-0">
                          <li className="list-inline-item me-2 mb-0">
                            <a href="" className="text-muted like">
                              <i className="uil uil-heart me-1" />
                              33
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="" className="text-muted comments">
                              <i className="uil uil-comment me-1" />
                              08
                            </a>
                          </li>
                        </ul>
                        <a
                          href="blog-detail.html"
                          className="text-muted readmore"
                        >
                          Read More{" "}
                          <i className="uil uil-angle-right-b align-middle" />
                        </a>
                      </div>
                    </div>
                    <div className="author">
                      <small className="user d-block">
                        <i className="uil uil-user" /> Calvin Carlo
                      </small>
                      <small className="date">
                        <i className="uil uil-calendar-alt" /> 25th June 2021
                      </small>
                    </div>
                  </div>
                </div>
                {/*end col*/}
                <div className="col-md-6 mt-4 pt-2">
                  <div className="card blog blog-primary rounded border-0 shadow">
                    <div className="position-relative">
                      <img src={blog2} className="card-img-top rounded-top" />
                      <div className="overlay rounded-top" />
                    </div>
                    <div className="card-body content">
                      <h5>
                        <a href="" className="card-title title text-dark">
                          How apps is changing the IT world
                        </a>
                      </h5>
                      <div className="post-meta d-flex justify-content-between mt-3">
                        <ul className="list-unstyled mb-0">
                          <li className="list-inline-item me-2 mb-0">
                            <a href="" className="text-muted like">
                              <i className="uil uil-heart me-1" />
                              33
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="" className="text-muted comments">
                              <i className="uil uil-comment me-1" />
                              08
                            </a>
                          </li>
                        </ul>
                        <a
                          href="blog-detail.html"
                          className="text-muted readmore"
                        >
                          Read More{" "}
                          <i className="uil uil-angle-right-b align-middle" />
                        </a>
                      </div>
                    </div>
                    <div className="author">
                      <small className="user d-block">
                        <i className="uil uil-user" /> Calvin Carlo
                      </small>
                      <small className="date">
                        <i className="uil uil-calendar-alt" /> 25th June 2021
                      </small>
                    </div>
                  </div>
                </div>
                {/*end col*/}
                <div className="col-12 mt-4 pt-2">
                  <a href="blog-grid.html" className="btn btn-primary">
                    See More{" "}
                    <i className="uil uil-angle-right-b align-middle" />
                  </a>
                </div>
                {/*end col*/}
              </div>
              {/*end row*/}
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
      {/* Profile End */}
    </div>
  );
}
