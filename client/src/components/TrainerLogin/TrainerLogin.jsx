import React, { useState } from "react";
import styles from "./TrainerLogin.module.css";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "@fortawesome/fontawesome-free/css/all.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import bg from "../assets/images/gym/bg2.jpg";
import VideoBg from "../assets/videoBg.mp4";
import LightLogo from "../assets/images/logo-light.png";

export default function TrainerLogin() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [apiResponse, setAPIResponse] = useState({ message: "", status: "" });
  //let { setToken } = useContext(TokenContext);

  //? Track error messages
  const [error, setError] = useState(null);
  async function login(values) {
    try {
      console.log(values);
      setIsLoading(true);
      let response = await axios.post(
        "http://localhost:4000/trainers/login",
        values
      );
      console.log("Errr", response)
      console.log("ResponseMsg: ", response.data.message);
      console.log("ResponseStatus: ", response.status);

      let { token } = response.data;
      console.log("Token: " + token);
      //TODO Migrate from local storage to fully rely on httpOnly cookies //TODO
      //! set the httpOnly token in local storage temporarily
      localStorage.setItem("token", token);
      let { id } = jwtDecode(token);
      console.log("ID: ", id);
      //Track API response for conditional rendering
      setAPIResponse({
        message: response.data.message,
        status: response.status,
      });
      //localStorage.setItem("userToken", data.token);
      //setToken(data.token);
      setTimeout(() => {
        localStorage.setItem("userType", "trainer");
        window.location.href = "/trainer/profile";
      }, 3000);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      let errorMsg = error.response.data.message;
      let errorStatus = error.response.status;
      //Track API response for conditional rendering
      setAPIResponse({
        message: errorMsg,
        status: errorStatus,
      });

      console.log("API Response", apiResponse);
      console.log("Error Message: ", errorMsg);
      console.log("Error Status: ", errorStatus);
    }
  }
  //?Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z]/, "Password should start with an uppercase letter")
      .matches(/^.{4,}$/, "Password should be more than 3 characters")
      .required("Password is required"),
  });
  //?Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <div className="row position-relative">
      <video
        autoPlay
        loop
        muted
        className="p-0 m-0 video-background position-absolute w-100"
      >
        <source src={VideoBg} type="video/mp4" />
      </video>
      <div className="container mt-3 py-5">
        <div className="card p-5 w-50 m-auto bg-transparent">
          <div className="text-center mb-3">
            <img src={LightLogo} alt="logo" width={200} />
          </div>
          <div className="text-center">
            {/* {error ? (
            <div className="alert alert-danger p-1">
              <i className="fa fa-triangle-exclamation "></i> &nbsp;
              {error}
            </div>
          ) : null} */}

            {apiResponse.status === 200 ? (
              <div className="alert alert-success text-center fw-bold">
                <i
                  className="fa-solid fa-check fa-bounce text-white"
                  style={{ color: "#5ac115" }}
                ></i>
                &nbsp;&nbsp;
                {apiResponse.message}
              </div>
            ) : apiResponse.status === 404 ? (
              <div className="alert alert-danger text-center fw-bold">
                <i
                  className="fa-solid fa-triangle-exclamation fa-bounce text-white"
                  style={{ color: "#df210c" }}
                ></i>
                &nbsp;
                {apiResponse.message}
              </div>
            ) : null}
          </div>

          <form onSubmit={formik.handleSubmit}>
            <FloatingLabel controlId="floatingEmail" label="Email">
              <label htmlFor="email"></label>
              <Form.Control
                placeholder="Enter your Email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FloatingLabel>
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger mt-1">
                {formik.errors.email}
              </div>
            ) : null}
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-2 mt-4"
            >
              <label htmlFor="password"></label>
              <Form.Control
                placeholder="Enter your Password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FloatingLabel>
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : null}
            <button
              type="submit"
              className="btn btn-outline-primary my-4 w-100 rounded"
            >
              {isLoading ? (
                <Spinner animation="border" variant="secondary" />
              ) : (
                "Login"
              )}
            </button>
            {/* Login With Google */}
            <div className="container col-6">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const decodedData = jwtDecode(credentialResponse.credential);
                  let { name, email, picture } = decodedData;
                  console.log(decodedData);
                  //console.log(name, email, picture);
                  let response = await axios.post(
                    "https://zen-task.onrender.com/profile",
                    decodedData
                  );
                  console.log(response.data);
                  console.log(
                    localStorage.setItem("token", response.data.token)
                  );
                  navigate("/profile");
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                useOneTap
              />
            </div>

            {/* <button
            className="btn btn-outline-secondary text-black rounded-pill col-12 mb-5"
            //onClick={() => auth()}
          >
            <img
              src="https://www.svgrepo.com/show/448227/google.svg"
              width={25}
            />
            <p className="d-inline pt-0 ms-1" />
            Continue with Google
          </button> */}
            <h6 className="text-center text-white mt-3">
              Don't have an account?&nbsp;
              <Link to={"/trainers/register"} className="link fw-bold">
                Register
              </Link>
            </h6>
          </form>
        </div>
      </div>
    </div>
  );
}
