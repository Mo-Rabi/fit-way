import React, { useState, useRef } from "react";
import styles from "./TrainerSettings.module.css";
import bg from "../assets/account/bg.png";
import clientPhoto from "../assets/client/05.jpg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWeightScale,
  faRulerVertical,
} from "@fortawesome/free-solid-svg-icons";
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
  User,
  UserCheck,
  MessageCircle,
  Key,
  Type,
} from "react-feather";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
// import UploadForm from "../CloudinaryAPI/UploadForm";
import CloudinaryWidget from "../CloudinaryWidget/CloudinaryWidget";
import Spinner from "react-bootstrap/Spinner";

export default function TrainerSettings() {
  // Get QueryClient from the context
  const queryClient = useQueryClient();
  //Invalidate queries to update automatically
  queryClient.invalidateQueries({ queryKey: ["trainerSettings"] });

  //Track server response message and status
  let [apiResponse, setApiResponse] = useState({ message: "", status: "" });
  //Get Token from local storage and set it to be sent with every axios request
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  //? Retrieve Trainer Settings
  // Invalidate every query in the cache
  // queryClient.invalidateQueries();
  // Invalidate every query with a key that starts with `todos`
  queryClient.invalidateQueries({ queryKey: ["trainerSettings"] });
  const trainerSettingsQuery = useQuery({
    queryKey: ["trainerSettings"],
    queryFn: async () => {
      let { data } = await axios.get("http://localhost:4000/trainerData");
      const trainerData = data.trainerData;
      console.log("Trainer Data: ", trainerData);
      firstName = trainerData.firstName;
      return trainerData;
    },
  });
  let firstName,
    lastName,
    email,
    title,
    description,
    phone,
    height,
    weight,
    picture;
  //country,
  //city;
  if (trainerSettingsQuery.isSuccess) {
    firstName = trainerSettingsQuery.data.firstName;
    lastName = trainerSettingsQuery.data.lastName;
    email = trainerSettingsQuery.data.email;
    title = trainerSettingsQuery.data.title;
    description = trainerSettingsQuery.data.description;
    phone = trainerSettingsQuery.data.phone;
    height = trainerSettingsQuery.data.height;
    weight = trainerSettingsQuery.data.weight;
    picture = trainerSettingsQuery.data.picture;

    //country = trainerSettingsQuery.data.country;
    // city = trainerSettingsQuery.data.city;
    //    return (firstName, lastName, email,title,description)
  }
  //? Update Trainer details
  const personalDataSchema = yup.object({
    firstName: yup
      .string()
      //.min(2, "Min 2 characters")
      .max(50, "Max number of characters is 50"),
    lastName: yup
      .string()
      //.min(2, "Min 2 characters")
      .max(50, "Max number of characters is 10"),
    email: yup.string().email(),
    //.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"),
    title: yup.string().max(25, "Max number of characters is 25"),
    description: yup.string().max(200, "Max number of characters is 200"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields, isDirty, isValid },
    control,
    trigger,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      title: "",
      description: "",
      picture: "",
      // password: "",
      // confirmPassword: "",
      // phone: "",
      // gender: "",
      // age: 0,
      // height: 0,
      // weight: 0,
    },
    mode: "onTouched",
    resolver: yupResolver(personalDataSchema),
  });

  //! Update User Details
  const onSubmit = async (data) => {
    try {
      console.log("Data", data);
      let response = await axios.patch(
        "http://localhost:4000/trainer/edit",
        data
      );
      console.log("Response", response);
      setApiResponse(response.data.message);
    } catch (error) {
      console.log("Error", error);
      //let errorMsg = error.response.data.message;
      //setApiResponse(errorMsg);
    }
  };

  if (trainerSettingsQuery.isLoading)
    return (
      <div
        className="spinner-container position-absolute w-100 h-100"
        style={{
          zIndex: "1000",
          background: "#B5DEF1",
        }}
      >
        <Spinner
          animation="grow"
          variant="primary"
          style={{ marginTop: "41vh", marginLeft: "45vw" }}
          className=""
        />
      </div>
    );
  if (trainerSettingsQuery.isError)
    return <pre>{JSON.stringify(trainerSettingsQuery.error)}</pre>;
  // let imageURLValue;
  // //! Get Profile image from child widget component
  // const getImageURL = (ImageURL) => {
  //   console.log("Image URL from PROP", ImageURL);
  //   if (ImageURL) {
  //     imageURLValue = ImageURL;
  //   }
  // };
  // console.log("###### Image URL from Prop OUT ########", imageURLValue);
  // let photo = imageURLValue;
  // console.log("Photo", photo);

  //? Logout function
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    window.location.href = "/";
  };
  return (
    <>
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
                          src={picture}
                          className="avatar avatar-large rounded-circle shadow d-block mx-auto"
                        />
                      </div>
                      {/*end col*/}
                      <div className="col-lg-10 col-md-9">
                        <div className="row align-items-end">
                          <div className="col-md-7 text-md-start text-center mt-4 mt-sm-0">
                            <h3 className="title mb-0">
                              {firstName + " "}
                              {lastName}
                            </h3>
                            <small className="text-muted h6 me-2">
                              {title}{" "}
                              <Link className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                                <CloudinaryWidget
                                  // getImageURL={getImageURL}
                                  className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                />
                              </Link>
                            </small>
                            <ul className="list-inline mb-0 mt-3">
                              <li className="list-inline-item me-4">
                                <a
                                  href=""
                                  className="text-muted"
                                  title="Instagram"
                                >
                                  <Instagram className="me-2 mb-1" />
                                  {firstName}_{lastName}
                                </a>
                              </li>
                              <li className="list-inline-item ms-2">
                                <a
                                  href=""
                                  className="text-muted"
                                  title="Linkedin"
                                >
                                  <Linkedin className="me-2 mb-2" />
                                  {firstName}-{lastName}
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/*end col*/}
                          <div className="col-md-5 text-md-end text-center">
                            <ul className="list-unstyled social-icon social mb-0 mt-4">
                              <li className="list-inline-item">
                                <a
                                  href=""
                                  className="rounded me-1"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="bottom"
                                  title="Add Friend"
                                >
                                  <i className="uil uil-user-plus align-middle " />
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="/trainer/chat"
                                  className="rounded me-1"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="bottom"
                                  title="Messages"
                                >
                                  <i className="uil uil-comment align-middle" />
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <a
                                  href=""
                                  className="rounded me-1"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="bottom"
                                  title="Notifications"
                                >
                                  <i className="uil uil-bell align-middle" />
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a
                                  href="account-setting.html"
                                  className="rounded"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="bottom"
                                  title="Settings"
                                >
                                  <i className="uil uil-cog align-middle" />
                                </a>
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
                          to={"/trainer/profile"}
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
                          to={"/trainer/chatOfTrainer"}
                          className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                        >
                          <span className="h4 mb-0">
                            <i className="uil uil-comment" />
                          </span>
                          <h6 className="mb-0 ms-2">Chat</h6>
                        </Link>
                      </li>
                      <li className="navbar-item account-menu px-0 mt-2">
                        <a
                          href="account-messages.html"
                          className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                        >
                          <span className="h4 mb-0">
                            <i className="uil uil-envelope-star" />
                          </span>
                          <h6 className="mb-0 ms-2">Messages</h6>
                        </a>
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
                        <Link
                          to={"/trainer/settings"}
                          className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                        >
                          <span className="h4 mb-0">
                            <i className="uil uil-setting" />
                          </span>
                          <h6 className="mb-0 ms-2">Settings</h6>
                        </Link>
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
                      <li className="list-inline-item">
                        <a href="" className="rounded me-1">
                          <Facebook />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="" className="rounded me-1">
                          <Instagram />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="" className="rounded me-1">
                          <Twitter />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="" className="rounded me-1">
                          <Linkedin />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="" className="rounded me-1">
                          <GitHub />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="" className="rounded me-1">
                          <Youtube />
                        </a>
                      </li>
                      <li className="list-inline-item">
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
                <div className="card border-0 rounded shadow">
                  <div className="card-body">
                    <h5 className="text-md-start text-center">
                      Personal Details :
                    </h5>
                    {/* <div className="mt-3 text-md-start text-center d-sm-flex">
                      <img
                        src={picture}
                        className="avatar float-md-left avatar-medium rounded-circle shadow me-md-4 d-inline"
                      />{" "}
                    </div> */}
                    {/* Personal information form */}
                    <form onSubmit={handleSubmit(onSubmit)} id="#upload-form">
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="firstName">
                              First Name
                            </label>
                            <div className="form-icon position-relative">
                              <User className="position-absolute mt-2 ms-2" />
                              <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="form-control ps-5"
                                placeholder={firstName}
                                {...register("firstName")}
                              />
                              {touchedFields.firstName &&
                              errors.firstName?.message ? (
                                <div className="alert alert-danger p-1 mt-2">
                                  {errors.firstName?.message}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="lastName">
                              Last Name
                            </label>
                            <div className="form-icon position-relative">
                              <UserCheck className="position-absolute mt-2 ms-2" />
                              <input
                                name="lastName"
                                id="lastName"
                                type="text"
                                className="form-control ps-5"
                                placeholder={lastName}
                                {...register("lastName")}
                              />
                              {touchedFields.lastName &&
                              errors.lastName?.message ? (
                                <div className="alert alert-danger p-1 mt-2">
                                  {errors.lastName?.message}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="email">
                              Your Email
                            </label>
                            <div className="form-icon position-relative">
                              <Mail className="position-absolute mt-2 ms-2" />
                              <input
                                name="email"
                                id="email"
                                type="email"
                                className="form-control ps-5"
                                placeholder={email}
                                {...register("email")}
                              />
                              {touchedFields.email && errors.email?.message ? (
                                <div className="alert alert-danger p-1 mt-2">
                                  {errors.email?.message}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="title">
                              Title
                            </label>
                            <div className="form-icon position-relative">
                              <Type className="position-absolute mt-2 ms-2" />
                              <input
                                name="title"
                                id="title"
                                type="text"
                                className="form-control ps-5"
                                placeholder={title}
                                {...register("title")}
                              />
                              {touchedFields.title && errors.title?.message ? (
                                <div className="alert alert-danger p-1 mt-2">
                                  {errors.title?.message}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="description">
                              Description
                            </label>
                            <div className="form-icon position-relative">
                              <MessageCircle className="position-absolute mt-2 ms-2" />

                              <textarea
                                name="description"
                                id="description"
                                rows={4}
                                className="form-control ps-5"
                                placeholder={description}
                                {...register("description")}
                              />
                              {touchedFields.description &&
                              errors.description?.message ? (
                                <div className="alert alert-danger p-1 mt-2">
                                  {errors.description?.message}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end row*/}
                      <div className="row">
                        <div className="col-sm-12">
                          <input
                            type="submit"
                            id="submit"
                            name="send"
                            className="btn btn-primary"
                            //alue="Save Changes"
                          />
                        </div>
                        {/*end col*/}
                      </div>
                      {/*end row*/}
                    </form>
                    {/*end form*/}
                    <div className="row">
                      <div className="col-md-6 mt-4 pt-2">
                        <h5>Contact Info :</h5>
                        <form>
                          <div className="row mt-4">
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Phone No. :
                                </label>
                                <div className="form-icon position-relative">
                                  <Phone className="position-absolute mt-2 ms-2" />

                                  <input
                                    name="number"
                                    id="number"
                                    type="number"
                                    className="form-control ps-5"
                                    placeholder={phone}
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">Website :</label>
                                <div className="form-icon position-relative">
                                  <Globe className="position-absolute mt-2 ms-2" />
                                  <input
                                    name="url"
                                    id="url"
                                    type="url"
                                    className="form-control ps-5"
                                    placeholder="Url :"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">Weight :</label>
                                <div className="form-icon position-relative">
                                  <FontAwesomeIcon
                                    className="position-absolute mt-2 ms-2"
                                    icon={faWeightScale}
                                  />
                                  <input
                                    name="url"
                                    id="url"
                                    type="number"
                                    className="form-control ps-5"
                                    placeholder={weight}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">Height :</label>
                                <div className="form-icon position-relative">
                                  <FontAwesomeIcon
                                    icon={faRulerVertical}
                                    className="position-absolute mt-2 ms-2"
                                  />
                                  <input
                                    name="url"
                                    id="url"
                                    type="number"
                                    className="form-control ps-5"
                                    placeholder={height}
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-12 mt-2 mb-0">
                              <button className="btn btn-primary">Add</button>
                            </div>
                            {/*end col*/}
                          </div>
                          {/*end row*/}
                        </form>
                      </div>
                      {/*end col*/}
                      <div className="col-md-6 mt-4 pt-2">
                        <h5>Change password :</h5>
                        <form>
                          <div className="row mt-4">
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Old password :
                                </label>
                                <div className="form-icon position-relative">
                                  <Key className="position-absolute mt-2 ms-2" />
                                  <input
                                    type="password"
                                    className="form-control ps-5"
                                    placeholder="Old password"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  New password :
                                </label>
                                <div className="form-icon position-relative">
                                  <Key className="position-absolute mt-2 ms-2" />

                                  <input
                                    type="password"
                                    className="form-control ps-5"
                                    placeholder="New password"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Re-type New password :
                                </label>
                                <div className="form-icon position-relative">
                                  <Key className="position-absolute mt-2 ms-2" />

                                  <input
                                    type="password"
                                    className="form-control ps-5"
                                    placeholder="Re-type New password"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-12 mt-2 mb-0">
                              <button className="btn btn-primary">
                                Save password
                              </button>
                            </div>
                            {/*end col*/}
                          </div>
                          {/*end row*/}
                        </form>
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end row*/}
                  </div>
                </div>
                <div className="rounded shadow mt-4">
                  <div className="p-4 border-bottom">
                    <h5 className="mb-0">Account Notifications :</h5>
                  </div>
                  <div className="p-4">
                    <div className="d-flex justify-content-between pb-4">
                      <h6 className="mb-0">When someone mentions me</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          //defaultValue
                          id="noti1"
                        />
                        <label className="form-check-label" htmlFor="noti1" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between py-4 border-top">
                      <h6 className="mb-0">When someone follows me</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          // defaultValue
                          defaultChecked="true"
                          id="noti2"
                        />
                        <label className="form-check-label" htmlFor="noti2" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between py-4 border-top">
                      <h6 className="mb-0">When shares my activity</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          // defaultValue
                          id="noti3"
                        />
                        <label className="form-check-label" htmlFor="noti3" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between py-4 border-top">
                      <h6 className="mb-0">When someone messages me</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          //  defaultValue
                          id="noti4"
                        />
                        <label className="form-check-label" htmlFor="noti4" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded shadow mt-4">
                  <div className="p-4 border-bottom">
                    <h5 className="mb-0">Marketing Notifications :</h5>
                  </div>
                  <div className="p-4">
                    <div className="d-flex justify-content-between pb-4">
                      <h6 className="mb-0">There is a sale or promotion</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          //defaultValue
                          id="noti5"
                        />
                        <label className="form-check-label" htmlFor="noti5" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between py-4 border-top">
                      <h6 className="mb-0">Company news</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          //defaultValue
                          id="noti6"
                        />
                        <label className="form-check-label" htmlFor="noti6" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between py-4 border-top">
                      <h6 className="mb-0">Weekly jobs</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          // defaultValue
                          defaultChecked="true"
                          id="noti7"
                        />
                        <label className="form-check-label" htmlFor="noti7" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between py-4 border-top">
                      <h6 className="mb-0">Unsubscribe News</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          // defaultValue
                          defaultChecked="true"
                          id="noti8"
                        />
                        <label className="form-check-label" htmlFor="noti8" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded shadow mt-4">
                  <div className="p-4 border-bottom">
                    <h5 className="mb-0 text-danger">Delete Account :</h5>
                  </div>
                  <div className="p-4">
                    <h6 className="mb-0">
                      Do you want to delete the account? Please press below
                      "Delete" button
                    </h6>
                    <div className="mt-4">
                      <button className="btn btn-danger">Delete Account</button>
                    </div>
                    {/*end col*/}
                  </div>
                </div>
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
    </>
  );
}
