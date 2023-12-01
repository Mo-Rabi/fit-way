import React, { useState } from "react";
import styles from "./TrainerSignup.module.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/images/gym/bg2.jpg";
import LightLogo from "../assets/images/logo-light.png";
export default function UserSignup() {
  const schema = yup.object({
    firstName: yup
      .string()
      .required("Required")
      .min(2, "Min 2 characters")
      .max(50, "Max number of characters is 50"),
    lastName: yup
      .string()
      .required("Required")
      .min(2, "Min 2 characters")
      .max(50, "Max number of characters is 10"),
    email: yup
      .string()
      .email()
      .required("Required")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"),
    password: yup
      .string()
      .matches(
        /^[A-Z][a-z0-9]{3,8}$/,
        "Password must start with an Uppercase letter and 4-8 char long"
      )
      .required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    phone: yup
      .string()
      .required("Required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    age: yup
      .number()
      .typeError("Must provide a number")
      .required("Required")
      .min(18, "Must be 18+")
      .max(100, "Must be less than 100")
      .integer(),
    gender: yup.string().required("Required"),
    height: yup
      .number()
      .typeError("Must be a number")
      .required("Required")
      .positive("Positive number only")
      .min(50, "Must be more than 50cm")
      .max(250, "Must be less than 250cm")
      .integer(),
    weight: yup
      .number()
      .typeError("Must be a number")

      .required("Required")
      .positive("Positive number only")
      .min(5, "Must be more than 5kg")
      .max(650, "Must be less than 635kg")
      .integer(),
    picture: yup.string(),
    price: yup
      .number()
      .typeError("Must provide a number")
      .required("Required")
      .positive("Positive number only")
      .min(100, "Minimum is 100"),
  });

  //? Track error messages
  const [ApiResponse, setApiResponse] = useState({ message: "", status: "" });

  //! Show/ hide password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

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
      password: "",
      confirmPassword: "",
      phone: "",
      gender: "",
      age: 0,
      height: 0,
      weight: 0,
      price: 0,
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  //?scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // async request which may result error
    try {
      let response = await axios.post(
        "http://localhost:4000/trainers/register",
        data
      );
      const serverMsg = response.data.message;
      const statusCode = response.status;
      setApiResponse({
        message: serverMsg,
        status: statusCode,
      });
      setTimeout(() => {
        navigate("/trainers/login");
      }, 4000);
    } catch (error) {
      let errorMsg = error.response.data.message;
      let statusCode = error.response.status;
      setApiResponse({ message: errorMsg, status: statusCode });
    }
  };
  // console.log(touchedFields, dirtyFields);

  const { onChange, onBlur, name, ref } = register("firstName");

  return (
    <div className="p-5 " style={{ background: `url(${bg})` }}>
      <div className="mt-5 container">
        <div className="d-flex justify-content-center">
          <div className="">
            <div className="card bg-transparent">
              <img
                className="rounded mx-auto"
                src={LightLogo}
                width="40%"
                alt="logo"
              />

              <div className="card-body mt-3 form-control bg-transparent border-0">
                {/*! Floating form Beginning */}
                {ApiResponse.status == 201 ? (
                  <div className="alert alert-success p-1 text-center">
                    <i className="fa fa-check fa-bounce text-white "></i> &nbsp;
                    {ApiResponse.message}
                  </div>
                ) : ApiResponse.status == 409 || ApiResponse.status === 400 ? (
                  <div className="alert alert-danger p-1 text-center">
                    <i className="fa fa-triangle-exclamation fa-bounce text-white "></i>
                    &nbsp;
                    {ApiResponse.message}
                  </div>
                ) : null}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/*! First Name */}
                  <div className="mb-3 form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="First Name"
                      {...register("firstName")}

                      //setError('firstName',  {'custom', 'custom message'} )
                    />
                    {touchedFields.firstName && errors.firstName?.message ? (
                      <div className="alert alert-danger p-1 mt-2">
                        {errors.firstName?.message}
                      </div>
                    ) : null}

                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                  </div>
                  {/*! Last Name */}
                  <div className="mb-3 form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      {...register("lastName")}
                    />
                    {touchedFields.lastName && errors.lastName?.message ? (
                      <div className="alert alert-danger p-1 mt-2">
                        {errors.lastName?.message}
                      </div>
                    ) : null}

                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                  </div>
                  {/*! Email with validation */}
                  <div className="mb-3 form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      {...register("email", {
                        required: "Please enter your Email",
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Invalid email format",
                        },
                      })}
                    />
                    {touchedFields.email && errors.email?.message ? (
                      <div className="alert alert-danger p-1 mt-2">
                        {errors.email?.message}
                      </div>
                    ) : null}

                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                  </div>
                  {/*! Password with validation */}
                  <div className="mb-3 form-floating">
                    <span
                      className="position-absolute mt-3"
                      style={{ marginLeft: "87%" }}
                    >
                      <a
                        className="link link-dark icon-link-hover-0 border-0"
                        type="button"
                        id="togglePassword"
                        onClick={togglePasswordVisibility}
                      >
                        <i
                          className="fa fa-eye fa-lg"
                          style={{ color: "#666666" }}
                        />
                      </a>
                    </span>
                    <input
                      type={passwordShown ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      {...register("password", {
                        required: "Please enter your password",
                        pattern: {
                          value: /^[A-Z][a-z0-9]{3,8}$/,
                          message:
                            "Password must start with an Uppercase letter and 4-8 char long",
                        },
                      })}
                    />

                    {touchedFields.password && errors.password?.message ? (
                      <div className="alert alert-danger p-1 mt-2 mb-2">
                        {errors.password?.message}
                      </div>
                    ) : null}
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                  </div>
                  {/*! Confirm password with validation */}
                  <div className="mb-3 form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                      })}
                    />

                    {touchedFields.confirmPassword &&
                    errors.confirmPassword?.message ? (
                      <div className="alert alert-danger p-1 mt-2">
                        {errors.confirmPassword?.message}
                      </div>
                    ) : null}

                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                  </div>
                  {/*! Phone Name */}
                  <div className="mb-3 form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      {...register("phone")}
                    />
                    {touchedFields.phone && errors.phone?.message ? (
                      <div className="alert alert-danger p-1 mt-2">
                        {errors.phone?.message}
                      </div>
                    ) : null}

                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                  </div>

                  {/* Gender */}
                  <div className="container d-flex text-white">
                    <p>Gender: </p>
                    <div className="form-check ms-3 me-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="male"
                        value="male"
                        id="male"
                        {...register("gender")}
                        checked
                      />
                      <label className="form-check-label" htmlFor="male">
                        male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="female"
                        id="female"
                        value="female"
                        {...register("gender")}
                      />
                      <label className="form-check-label" htmlFor="female">
                        female
                      </label>
                    </div>
                  </div>

                  {/*! Age  */}
                  <div className="mb-3 form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      name="age"
                      placeholder="Age"
                      {...register("age")}
                    />
                    {touchedFields.age && errors.age?.message ? (
                      <div className="alert alert-danger p-1 mt-2">
                        {errors.age?.message}
                      </div>
                    ) : null}

                    <label htmlFor="age" className="form-label">
                      Age
                    </label>
                  </div>
                  {/*! Height  */}
                  <div className="mb-3 form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="height"
                      name="height"
                      placeholder="Height"
                      {...register("height")}
                    />
                    {touchedFields.height && errors.height?.message ? (
                      <div className="alert alert-danger p-1 mt-2">
                        {errors.height?.message}
                      </div>
                    ) : null}

                    <label htmlFor="height" className="form-label">
                      Height
                    </label>
                  </div>
                  {/*! Weight  */}
                  <div className="mb-3 form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="weight"
                      name="weight"
                      placeholder="Weight"
                      {...register("weight")}
                    />
                    {touchedFields.weight && errors.weight?.message ? (
                      <div className="alert alert-danger p-1 mt-2">
                        {errors.weight?.message}
                      </div>
                    ) : null}

                    <label htmlFor="gender" className="form-label">
                      Weight
                    </label>
                  </div>
                  {/*! Price  */}
                  <div className="mb-3 form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      placeholder="price"
                      {...register("price")}
                    />
                    {touchedFields.price && errors.price?.message ? (
                      <div className="alert alert-danger p-1 mt-2">
                        {errors.price?.message}
                      </div>
                    ) : null}

                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn text-white col-12"
                      style={{ backgroundColor: "#36b37e", fontWeight: 700 }}
                      onClick={scrollToTop}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                <DevTool control={control} />
                <p className="text-center">
                  Already have an account?{" "}
                  <Link to={"/trainers/login"}> Log In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
