import React from "react";
import styles from "./Home.module.css";
import bg from "../assets/images/gym/bg.jpg";
import about from "../assets/images/gym/about01.jpg";
import img1 from "../assets/images/gym/01.jpg";
import img2 from "../assets/images/gym/02.jpg";
import img3 from "../assets/images/gym/03.jpg";
import img4 from "../assets/images/gym/04.jpg";
import img5 from "../assets/images/gym/05.jpg";
import img6 from "../assets/images/gym/06.jpg";
import img7 from "../assets/images/gym/07.jpg";
import img8 from "../assets/images/gym/08.jpg";
import img9 from "../assets/images/gym/09.jpg";
import img10 from "../assets/images/gym/10.jpg";
import deadlift from "../assets/images/gym/icon/dumbbell.png";
import chestExpander from "../assets/images/gym/icon/chest-expander.png";
import benchPress from "../assets/images/gym/icon/bench-press.png";
import gymnasticRings from "../assets/images/gym/icon/gymnastic-rings.png";
import handGrip from "../assets/images/gym/icon/hand-grip.png";
import dumbbell from "../assets/images/gym/icon/dumbbell.png";
import skippingRope from "../assets/images/gym/icon/skipping-rope.png";
import kettlebell from "../assets/images/gym/icon/kettlebell.png";
import man from "../assets/images/gym/icon/man.png";
import pool from "../assets/images/gym/icon/pool.png";
import punchingBag from "../assets/images/gym/icon/punching-bag.png";
import punchingBag2 from "../assets/images/gym/icon/punching-bag-2.png";
import cta from "../assets/images/gym/cta.jpg";
import team1 from "../assets/images/gym/team1.jpg";
import team2 from "../assets/images/gym/team2.jpg";
import team3 from "../assets/images/gym/team3.jpg";
import team4 from "../assets/images/gym/team4.jpg";
import client1 from "../assets/client/01.jpg";
import client2 from "../assets/client/02.jpg";
import client3 from "../assets/client/03.jpg";
import client4 from "../assets/client/04.jpg";
import client5 from "../assets/client/05.jpg";
import client6 from "../assets/client/06.jpg";
import blog1 from "../assets/images/blog/01.jpg";
import blog2 from "../assets/images/blog/02.jpg";
import blog3 from "../assets/images/blog/03.jpg";
import Modal from "react-bootstrap/Modal";

export default function Home() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      {/* Hero Start */}
      <section
        className="bg-home d-flex align-items-center"
        style={{ background: `url(${bg}) center center` }}
      >
        <div className="bg-overlay bg-gradient-overlay" />
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="text-primary fw-bold">
                  Muscles Flexed Since 2010
                </h5>
                <h4 className="heading heading-lg mb-4 fw-bold text-white title-dark">
                  Shape Your Ideal Body
                </h4>
                <p className="para-desc text-white-50 mx-auto">
                  Launch your campaign and benefit from our expertise on
                  designing and managing conversion centered evidence-backed
                  journey.
                </p>
                <div className="mt-4 pt-2">
                  <a href="javascript:void(0)" className="btn btn-primary">
                    Start Today
                  </a>
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
      {/* Hero End */}
      {/* Start */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6">
              <div className="position-relative">
                <img src={about} className="rounded-md shadow img-fluid" alt />
                <div className="play-icon">
                  <a
                    // href="#"
                    data-type="youtube"
                    data-id="HQfF5XRVXjU"
                    className="play-btn lightbox border-0"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="mdi mdi-play text-primary rounded-circle shadow" />
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}

            <div className="col-lg-7 col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="section-title ms-lg-5">
                <h4 className="title mb-4">
                  Introducing FitWay, <br /> A Fitness Center
                </h4>
                <p className="text-muted">
                  Get instant helpful resources about anything on the go, easily
                  implement secure money transfer solutions, boost your daily
                  efficiency.
                </p>
                <p className="text-muted mb-0">
                  It seems that only fragments of the original text remain in
                  the Lorem Ipsum texts used today. One may speculate that over
                  the course of time certain letters were added or deleted at
                  various positions within the text. This might also explain why
                  one can now find slightly different versions.
                </p>
                <div className="mt-4">
                  <a href className="btn btn-pills btn-primary">
                    Join Now
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col">
              <div className="section-title text-center mb-4 pb-2">
                <h2 className="title mb-4">Take a Sneak Peek Inside</h2>
                <p className="text-muted para-desc mb-0 mx-auto">
                  Start working with{" "}
                  <span className="text-primary fw-bold">FitWay</span> that can
                  provide everything you need to generate awareness, drive
                  traffic, connect.
                </p>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
        <div className="container-fluid px-0">
          <div className="row g-0 row-cols-lg-5 row-cols-md-3 row-cols-2 mt-4 pt-2">
            <div className="col">
              <div className="card rounded-0">
                <div className="card-body p-0">
                  <a className="lightbox">
                    {/* trigger modal */}

                    <img
                      src={img1}
                      className="img-fluid"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{ cursor: "pointer" }}
                    />
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                          {" "}
                          <img
                            src={img1}
                            className="img-fluid"
                            alt
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}

            <div className="col">
              <div className="card rounded-0">
                <div className="card-body p-0">
                  <a className="lightbox">
                    {/* trigger modal */}

                    <img
                      src={img2}
                      className="img-fluid"
                      alt
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModals"
                      style={{ cursor: "pointer" }}
                    />
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModals"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                          {" "}
                          <img
                            src={img2}
                            className="img-fluid"
                            alt
                            data-bs-toggle="modals"
                            data-bs-target="#exampleModals"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col">
              <div className="card rounded-0">
                <div className="card-body p-0">
                  <a className="lightbox">
                    {/* trigger modal */}

                    <img
                      src={img3}
                      className="img-fluid"
                      alt
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModals2"
                      style={{ cursor: "pointer" }}
                    />
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModals2"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                          {" "}
                          <img
                            src={img3}
                            className="img-fluid"
                            alt
                            data-bs-toggle="modals"
                            data-bs-target="#exampleModals2"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col">
              <div className="card rounded-0">
                <div className="card-body p-0">
                  <a className="lightbox">
                    {/* trigger modal */}

                    <img
                      src={img4}
                      className="img-fluid"
                      alt
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModals3"
                      style={{ cursor: "pointer" }}
                    />
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModals3"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                          {" "}
                          <img
                            src={img4}
                            className="img-fluid"
                            alt
                            data-bs-toggle="modals"
                            data-bs-target="#exampleModals3"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col">
              <div className="card rounded-0">
                <div className="card-body p-0">
                  <a className="lightbox">
                    {/* trigger modal */}

                    <img
                      src={img5}
                      className="img-fluid"
                      alt
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModals4"
                      style={{ cursor: "pointer" }}
                    />
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModals4"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                          {" "}
                          <img
                            src={img5}
                            className="img-fluid"
                            alt
                            data-bs-toggle="modals"
                            data-bs-target="#exampleModals4"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col">
              <div className="card rounded-0">
                <div className="card-body p-0">
                  <a className="lightbox">
                    {/* trigger modal */}

                    <img
                      src={img6}
                      className="img-fluid"
                      alt
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModals5"
                      style={{ cursor: "pointer" }}
                    />
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModals5"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                          {" "}
                          <img
                            src={img6}
                            className="img-fluid"
                            alt
                            data-bs-toggle="modals"
                            data-bs-target="#exampleModals5"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col">
              <div className="card rounded-0">
                <div className="card-body p-0">
                  <a className="lightbox">
                    {/* trigger modal */}

                    <img
                      src={img7}
                      className="img-fluid"
                      alt
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModals6"
                      style={{ cursor: "pointer" }}
                    />
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModals6"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                          {" "}
                          <img
                            src={img7}
                            className="img-fluid"
                            alt
                            data-bs-toggle="modals"
                            data-bs-target="#exampleModals6"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col">
              <div className="card rounded-0">
                <div className="card-body p-0">
                  <a className="lightbox">
                    {/* trigger modal */}

                    <img
                      src={img8}
                      className="img-fluid"
                      alt
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModals7"
                      style={{ cursor: "pointer" }}
                    />
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModals7"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                          {" "}
                          <img
                            src={img8}
                            className="img-fluid"
                            alt
                            data-bs-toggle="modals"
                            data-bs-target="#exampleModals7"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col">
              <div className="card rounded-0">
                <div className="card-body p-0">
                  <a className="lightbox">
                    {/* trigger modal */}

                    <img
                      src={img9}
                      className="img-fluid"
                      alt
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModals8"
                      style={{ cursor: "pointer" }}
                    />
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModals8"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                          {" "}
                          <img
                            src={img9}
                            className="img-fluid"
                            alt
                            data-bs-toggle="modals"
                            data-bs-target="#exampleModals8"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col">
              <div className="card rounded-0">
                <div className="card-body p-0">
                  <a className="lightbox">
                    {/* trigger modal */}

                    <img
                      src={img10}
                      className="img-fluid"
                      alt
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModals9"
                      style={{ cursor: "pointer" }}
                    />
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModals9"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                          {" "}
                          <img
                            src={img10}
                            className="img-fluid"
                            alt
                            data-bs-toggle="modals"
                            data-bs-target="#exampleModals9"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="section-title mb-4 pb-2">
                <h4 className="title mb-4">
                  Training Programs We Offer For You
                </h4>
                <p className="text-muted para-desc mb-0 mx-auto">
                  Start working with{" "}
                  <span className="text-primary fw-bold">FitWay</span> that can
                  provide everything you need to generate awareness, drive
                  traffic, connect.
                </p>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
              <div className="card features feature-primary feature-full-bg rounded p-4 position-relative overflow-hidden border-0">
                <span className="display-4 mb-4 icon-color">
                  <i className="mdi mdi-gymnastics" />
                </span>
                <div className="card-body p-0 content">
                  <h5>Flex Muscle</h5>
                  <p className="para text-muted">
                    It is a long established fact that a reader will be of a
                    page reader will be of at its layout.
                  </p>
                  <div className>
                    <a href className="readmore text-muted fw-semibold">
                      Join Now <i className="uil uil-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
              <div className="card features feature-primary feature-full-bg rounded p-4 bg-primary position-relative overflow-hidden border-0">
                <span className="display-4 mb-4 text-white-50">
                  <i className="mdi mdi-dumbbell" />
                </span>
                <div className="card-body p-0 content">
                  <h5 className="text-white">Strenght</h5>
                  <p className="para text-white-50">
                    It is a long established fact that a reader will be of a
                    page reader will be of at its layout.
                  </p>
                  <div className>
                    <a href className="readmore text-white fw-semibold">
                      Join Now <i className="uil uil-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
              <div className="card features feature-primary feature-full-bg rounded p-4 position-relative overflow-hidden border-0">
                <span className="display-4 mb-4 icon-color">
                  <i className="mdi mdi-weight-lifter" />
                </span>
                <div className="card-body p-0 content">
                  <h5>Physical Fitness</h5>
                  <p className="para text-muted">
                    It is a long established fact that a reader will be of a
                    page reader will be of at its layout.
                  </p>
                  <div className>
                    <a href className="readmore text-muted fw-semibold">
                      Join Now <i className="uil uil-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
              <div className="card features feature-primary feature-full-bg rounded p-4 position-relative overflow-hidden border-0">
                <span className="display-4 mb-4 icon-color">
                  <i className="mdi mdi-google-fit" />
                </span>
                <div className="card-body p-0 content">
                  <h5>Fat Loss</h5>
                  <p className="para text-muted">
                    It is a long established fact that a reader will be of a
                    page reader will be of at its layout.
                  </p>
                  <div className>
                    <a href className="readmore text-muted fw-semibold">
                      Join Now <i className="uil uil-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
        </div>
        {/*end container*/}
        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col">
              <div className="section-title text-center mb-4 pb-2">
                <h2 className="title mb-4">Gym Schedule</h2>
                <p className="text-muted para-desc mx-auto mb-0">
                  Push your fitness further with our mix of facilities and we'll
                  support you with advice on new and better ways to train.
                </p>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
          <div className="row justify-content-center">
            <div className="col-12 pt-4 filters-group-wrap text-center">
              <div className="filters-group">
                <ul className="container-filter filter-border list-inline mb-0 filter-options text-center">
                  <li
                    className="list-inline-item text-uppercase position-relative active"
                    data-group="all"
                  >
                    All
                  </li>
                  <li
                    className="list-inline-item text-uppercase position-relative"
                    data-group="monday"
                  >
                    Monday
                  </li>
                  <li
                    className="list-inline-item text-uppercase position-relative"
                    data-group="tuesday"
                  >
                    Tuesday
                  </li>
                  <li
                    className="list-inline-item text-uppercase position-relative"
                    data-group="wednesday"
                  >
                    Wednesday
                  </li>
                  <li
                    className="list-inline-item text-uppercase position-relative"
                    data-group="thursday"
                  >
                    Thursday
                  </li>
                  <li
                    className="list-inline-item text-uppercase position-relative"
                    data-group="friday"
                  >
                    Friday
                  </li>
                  <li
                    className="list-inline-item text-uppercase position-relative"
                    data-group="saturday"
                  >
                    Saturday
                  </li>
                </ul>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
          <div
            id="grid"
            className="row row-cols-xl-6 row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 justify-content-center"
          >
            <div
              className="col picture-item mt-4"
              data-groups='["monday", "wednesday", "friday"]'
            >
              <div className="card schedule-time p-4 rounded shadow text-center m-1">
                <img
                  src={deadlift}
                  className="avatar avatar-small d-block mx-auto"
                  alt
                />
                <div className="content mt-4">
                  <h6 className="mb-0 ex-name fw-bold">Deadlift</h6>
                  <small className="text-muted mb-0">06AM - 07AM</small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div
              className="col picture-item mt-4"
              data-groups='["monday", "wednesday", "friday"]'
            >
              <div className="card schedule-time p-4 rounded shadow text-center m-1">
                <img
                  src={chestExpander}
                  className="avatar avatar-small d-block mx-auto"
                  alt
                />
                <div className="content mt-4">
                  <h6 className="mb-0 ex-name fw-bold">Back squat</h6>
                  <small className="text-muted mb-0">07AM - 08AM</small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div
              className="col picture-item mt-4"
              data-groups='["tuesday", "thursday", "saturday"]'
            >
              <div className="card schedule-time p-4 rounded shadow text-center m-1">
                <img
                  src={benchPress}
                  className="avatar avatar-small d-block mx-auto"
                  alt
                />
                <div className="content mt-4">
                  <h6 className="mb-0 ex-name fw-bold">Bench Press</h6>
                  <small className="text-muted mb-0">08AM - 09AM</small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div
              className="col picture-item mt-4"
              data-groups='["monday", "wednesday", "friday"]'
            >
              <div className="card schedule-time p-4 rounded shadow text-center m-1">
                <img
                  src={gymnasticRings}
                  className="avatar avatar-small d-block mx-auto"
                  alt
                />
                <div className="content mt-4">
                  <h6 className="mb-0 ex-name fw-bold">Dumbbell</h6>
                  <small className="text-muted mb-0">09AM - 10AM</small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div
              className="col picture-item mt-4"
              data-groups='["tuesday", "thursday", "saturday"]'
            >
              <div className="card schedule-time p-4 rounded shadow text-center m-1">
                <img
                  src={handGrip}
                  className="avatar avatar-small d-block mx-auto"
                  alt
                />
                <div className="content mt-4">
                  <h6 className="mb-0 ex-name fw-bold">Pushups</h6>
                  <small className="text-muted mb-0">11AM - 12PM</small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div
              className="col picture-item mt-4"
              data-groups='["monday", "wednesday", "friday"]'
            >
              <div className="card schedule-time p-4 rounded shadow text-center m-1">
                <img
                  src={skippingRope}
                  className="avatar avatar-small d-block mx-auto"
                  alt
                />
                <div className="content mt-4">
                  <h6 className="mb-0 ex-name fw-bold">Chest</h6>
                  <small className="text-muted mb-0">05PM - 06PM</small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div
              className="col picture-item mt-4"
              data-groups='["tuesday", "thursday", "saturday"]'
            >
              <div className="card schedule-time p-4 rounded shadow text-center m-1">
                <img
                  src={kettlebell}
                  className="avatar avatar-small d-block mx-auto"
                  alt
                />
                <div className="content mt-4">
                  <h6 className="mb-0 ex-name fw-bold">Kettlebell</h6>
                  <small className="text-muted mb-0">06PM - 07PM</small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div
              className="col picture-item mt-4"
              data-groups='["monday", "wednesday", "friday"]'
            >
              <div className="card schedule-time p-4 rounded shadow text-center m-1">
                <img
                  src={man}
                  className="avatar avatar-small d-block mx-auto"
                  alt
                />
                <div className="content mt-4">
                  <h6 className="mb-0 ex-name fw-bold">Pullup</h6>
                  <small className="text-muted mb-0">07PM - 08PM</small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div
              className="col picture-item mt-4"
              data-groups='["tuesday", "thursday", "saturday"]'
            >
              <div className="card schedule-time p-4 rounded shadow text-center m-1">
                <img
                  src={pool}
                  className="avatar avatar-small d-block mx-auto"
                  alt
                />
                <div className="content mt-4">
                  <h6 className="mb-0 ex-name fw-bold">Biceps</h6>
                  <small className="text-muted mb-0">08PM - 09PM</small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div
              className="col picture-item mt-4"
              data-groups='["monday", "wednesday", "friday"]'
            >
              <div className="card schedule-time p-4 rounded shadow text-center m-1">
                <img
                  src={punchingBag2}
                  className="avatar avatar-small d-block mx-auto"
                  alt
                />
                <div className="content mt-4">
                  <h6 className="mb-0 ex-name fw-bold">Triceps</h6>
                  <small className="text-muted mb-0">09PM - 10PM</small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div
              className="col picture-item mt-4"
              data-groups='["tuesday", "thursday", "saturday"]'
            >
              <div className="card schedule-time p-4 rounded shadow text-center m-1">
                <img
                  src={punchingBag}
                  className="avatar avatar-small d-block mx-auto"
                  alt
                />
                <div className="content mt-4">
                  <h6 className="mb-0 ex-name fw-bold">Legs</h6>
                  <small className="text-muted mb-0">11PM - 12AM</small>
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
      {/* End */}
      {/* CTA Start */}
      <section
        className="section bg-cta"
        style={{ background: `url(${cta}) top` }}
        id="cta"
      >
        <div className="bg-overlay bg-gradient-overlay" />
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="section-title">
                <h4 className="title title-dark text-white mb-4">
                  Stop leaving money on the table.
                </h4>
                <p className="text-white-50 para-dark para-desc mx-auto mb-4">
                  Start working with FitWay that can provide everything you need
                  to generate awareness, drive traffic, connect.
                </p>
                <a
                  href="#!"
                  data-type="youtube"
                  data-id="yba7hPeTSjk"
                  className="avatar avatar-md-md mx-auto rounded-pill shadow-md card d-flex justify-content-center align-items-center lightbox"
                >
                  <i className="mdi mdi-play mdi-24px text-primary" />
                </a>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
      {/* CTA End */}
      {/* Start */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="section-title text-center mb-4 pb-2">
                <h2 className="title mb-4">Gym Trainer</h2>
                <p className="text-muted para-desc mx-auto mb-0">
                  Start working with{" "}
                  <span className="text-primary fw-bold">FitWay</span> that can
                  provide everything you need to generate awareness, drive
                  traffic, connect.
                </p>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
          <div className="row">
            <div className="col-lg-3 col-md-6 mt-4 pt-2">
              <div className="card team team-primary text-center bg-transparent border-0">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <img src={team1} className="img-fluid rounded-pill" alt />
                    <ul className="list-unstyled mb-0 team-icon">
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className="text-primary ms-1">
                          <i className="mdi mdi-facebook" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className=" text-primary ms-1">
                          <i className="mdi mdi-instagram" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className=" text-primary ms-1">
                          <i className="mdi mdi-twitter" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className=" text-primary">
                          <i className="mdi mdi-linkedin" />{" "}
                        </a>
                      </li>
                    </ul>
                    {/*end icon*/}
                  </div>
                  <div className="content pt-3 pb-3">
                    <h5 className="mb-0">
                      <a href="javascript:void(0)" className="name text-dark">
                        Ronny Jofra
                      </a>
                    </h5>
                    <small className="designation text-muted">Trainer</small>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-3 col-md-6 mt-4 pt-2">
              <div className="card team team-primary text-center bg-transparent border-0">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <img src={team4} className="img-fluid rounded-pill" alt />
                    <ul className="list-unstyled mb-0 team-icon">
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className="text-primary ms-1">
                          <i className="mdi mdi-facebook" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className=" text-primary ms-1">
                          <i className="mdi mdi-instagram" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className=" text-primary ms-1">
                          <i className="mdi mdi-twitter" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className=" text-primary">
                          <i className="mdi mdi-linkedin" />{" "}
                        </a>
                      </li>
                    </ul>
                    {/*end icon*/}
                  </div>
                  <div className="content pt-3 pb-3">
                    <h5 className="mb-0">
                      <a href="javascript:void(0)" className="name text-dark">
                        Micheal Carlo
                      </a>
                    </h5>
                    <small className="designation text-muted">Trainer</small>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-3 col-md-6 mt-4 pt-2">
              <div className="card team team-primary text-center bg-transparent border-0">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <img src={team2} className="img-fluid rounded-pill" alt />
                    <ul className="list-unstyled mb-0 team-icon">
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className="text-primary ms-1">
                          <i className="mdi mdi-facebook" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className=" text-primary ms-1">
                          <i className="mdi mdi-instagram" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className=" text-primary ms-1">
                          <i className="mdi mdi-twitter" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className=" text-primary">
                          <i className="mdi mdi-linkedin" />{" "}
                        </a>
                      </li>
                    </ul>
                    {/*end icon*/}
                  </div>
                  <div className="content pt-3 pb-3">
                    <h5 className="mb-0">
                      <a href="javascript:void(0)" className="name text-dark">
                        Aliana Rosy
                      </a>
                    </h5>
                    <small className="designation text-muted">Trainer</small>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="col-lg-3 col-md-6 mt-4 pt-2">
              <div className="card team team-primary text-center bg-transparent border-0">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <img src={team3} className="img-fluid rounded-pill" alt />
                    <ul className="list-unstyled mb-0 team-icon">
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className="text-primary ms-1">
                          <i className="mdi mdi-facebook" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className=" text-primary ms-1">
                          <i className="mdi mdi-instagram" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className=" text-primary ms-1">
                          <i className="mdi mdi-twitter" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="javascript:void(0)" className=" text-primary">
                          <i className="mdi mdi-linkedin" />{" "}
                        </a>
                      </li>
                    </ul>
                    {/*end icon*/}
                  </div>
                  <div className="content pt-3 pb-3">
                    <h5 className="mb-0">
                      <a href="javascript:void(0)" className="name text-dark">
                        Sofia Razaq
                      </a>
                    </h5>
                    <small className="designation text-muted">Trainer</small>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col">
              <div className="section-title text-center mb-4 pb-2">
                <h2 className="title mb-4">Trusted by Our Customers</h2>
                <p className="text-muted para-desc mx-auto mb-0">
                  Start working with{" "}
                  <span className="text-primary fw-bold">FitWay</span> that can
                  provide everything you need to generate awareness, drive
                  traffic, connect.
                </p>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
          <div className="row justify-content-center">
            <div className="col-lg-12 mt-4">
              <div className="tiny-three-item">
                <div
                  className="tiny-slide wow animate__animated animate__fadeInUp"
                  data-wow-delay=".3s"
                >
                  <div className="d-flex client-testi m-1">
                    <img
                      src={client1}
                      className="avatar avatar-small client-image rounded shadow"
                      alt
                    />
                    <div className="card flex-1 content p-3 shadow rounded position-relative">
                      <ul className="list-unstyled mb-0">
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                      </ul>
                      <p className="text-muted mt-2">
                        " It seems that only fragments of the original text
                        remain in the Lorem Ipsum texts used today. "
                      </p>
                      <h6 className="text-primary">
                        - Thomas Palestine{" "}
                        <small className="text-muted">C.E.O</small>
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  className="tiny-slide wow animate__animated animate__fadeInUp"
                  data-wow-delay=".5s"
                >
                  <div className="d-flex client-testi m-1">
                    <img
                      src={client2}
                      className="avatar avatar-small client-image rounded shadow"
                      alt
                    />
                    <div className="card flex-1 content p-3 shadow rounded position-relative">
                      <ul className="list-unstyled mb-0">
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star-half text-warning" />
                        </li>
                      </ul>
                      <p className="text-muted mt-2">
                        " One disadvantage of Lorum Ipsum is that in Latin
                        certain letters appear more frequently than others. "
                      </p>
                      <h6 className="text-primary">
                        - Barbara McIntosh{" "}
                        <small className="text-muted">M.D</small>
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  className="tiny-slide wow animate__animated animate__fadeInUp"
                  data-wow-delay=".7s"
                >
                  <div className="d-flex client-testi m-1">
                    <img
                      src={client3}
                      className="avatar avatar-small client-image rounded shadow"
                      alt
                    />
                    <div className="card flex-1 content p-3 shadow rounded position-relative">
                      <ul className="list-unstyled mb-0">
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                      </ul>
                      <p className="text-muted mt-2">
                        " The most well-known dummy text is the 'Lorem Ipsum',
                        which is said to have originated in the 16th century. "
                      </p>
                      <h6 className="text-primary">
                        - Carl Oliver <small className="text-muted">P.A</small>
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  className="tiny-slide wow animate__animated animate__fadeInUp"
                  data-wow-delay=".9s"
                >
                  <div className="d-flex client-testi m-1">
                    <img
                      src={client4}
                      className="avatar avatar-small client-image rounded shadow"
                      alt
                    />
                    <div className="card flex-1 content p-3 shadow rounded position-relative">
                      <ul className="list-unstyled mb-0">
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                      </ul>
                      <p className="text-muted mt-2">
                        " According to most sources, Lorum Ipsum can be traced
                        back to a text composed by Cicero. "
                      </p>
                      <h6 className="text-primary">
                        - Christa Smith{" "}
                        <small className="text-muted">Manager</small>
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  className="tiny-slide wow animate__animated animate__fadeInUp"
                  data-wow-delay="1.1s"
                >
                  <div className="d-flex client-testi m-1">
                    <img
                      src={client5}
                      className="avatar avatar-small client-image rounded shadow"
                      alt
                    />
                    <div className="card flex-1 content p-3 shadow rounded position-relative">
                      <ul className="list-unstyled mb-0">
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                      </ul>
                      <p className="text-muted mt-2">
                        " There is now an abundance of readable dummy texts.
                        These are usually used when a text is required. "
                      </p>
                      <h6 className="text-primary">
                        - Dean Tolle{" "}
                        <small className="text-muted">Developer</small>
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  className="tiny-slide wow animate__animated animate__fadeInUp"
                  data-wow-delay="1.3s"
                >
                  <div className="d-flex client-testi m-1">
                    <img
                      src={client6}
                      className="avatar avatar-small client-image rounded shadow"
                      alt
                    />
                    <div className="card flex-1 content p-3 shadow rounded position-relative">
                      <ul className="list-unstyled mb-0">
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                        <li className="list-inline-item">
                          <i className="mdi mdi-star text-warning" />
                        </li>
                      </ul>
                      <p className="text-muted mt-2">
                        " Thus, Lorem Ipsum has only limited suitability as a
                        visual filler for German texts. "
                      </p>
                      <h6 className="text-primary">
                        - Jill Webb{" "}
                        <small className="text-muted">Designer</small>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
        <div className="container mt-100 mt-60">
          <div className="row">
            <div className="col-12 text-center">
              <div className="section-title text-center mb-4 pb-2">
                <h2 className="title mb-4">Latest Gym Blog &amp; News</h2>
                <p className="text-muted para-desc mx-auto mb-0">
                  Start working with{" "}
                  <span className="text-primary fw-bold">FitWay</span> that can
                  provide everything you need to generate awareness, drive
                  traffic, connect.
                </p>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
          <div className="row">
            <div className="col-lg-4 col-md-6 mt-4 pt-2">
              <div className="card blog blog-primary rounded border-0 shadow">
                <div className="position-relative">
                  <img
                    src={blog1}
                    className="card-img-top rounded-top"
                    alt="..."
                  />
                  <div className="overlay rounded-top" />
                </div>
                <div className="card-body content">
                  <h5>
                    <a
                      href="javascript:void(0)"
                      className="card-title title text-dark"
                    >
                      How to Maximize Time Spent at the Gym
                    </a>
                  </h5>
                  <p className="text-muted mb-0">
                    The advantage of its Latin origin and the relative
                  </p>
                  <div className="post-meta d-flex justify-content-between mt-2">
                    <ul className="list-unstyled mb-0">
                      <li className="list-inline-item me-2 mb-0">
                        <a
                          href="javascript:void(0)"
                          className="text-muted like"
                        >
                          <i className="uil uil-heart me-1" />
                          33
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="javascript:void(0)"
                          className="text-muted comments"
                        >
                          <i className="uil uil-comment me-1" />
                          08
                        </a>
                      </li>
                    </ul>
                    <a href="blog-detail.html" className="text-muted readmore">
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
            <div className="col-lg-4 col-md-6 mt-4 pt-2">
              <div className="card blog blog-primary rounded border-0 shadow">
                <div className="position-relative">
                  <img
                    src={blog2}
                    className="card-img-top rounded-top"
                    alt="..."
                  />
                  <div className="overlay rounded-top" />
                </div>
                <div className="card-body content">
                  <h5>
                    <a
                      href="javascript:void(0)"
                      className="card-title title text-dark"
                    >
                      Today is the Best Day to Start Training
                    </a>
                  </h5>
                  <p className="text-muted mb-0">
                    The advantage of its Latin origin and the relative
                  </p>
                  <div className="post-meta d-flex justify-content-between mt-2">
                    <ul className="list-unstyled mb-0">
                      <li className="list-inline-item me-2 mb-0">
                        <a
                          href="javascript:void(0)"
                          className="text-muted like"
                        >
                          <i className="uil uil-heart me-1" />
                          33
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="javascript:void(0)"
                          className="text-muted comments"
                        >
                          <i className="uil uil-comment me-1" />
                          08
                        </a>
                      </li>
                    </ul>
                    <a href="blog-detail.html" className="text-muted readmore">
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
            <div className="col-lg-4 col-md-6 mt-4 pt-2">
              <div className="card blog blog-primary rounded border-0 shadow">
                <div className="position-relative">
                  <img
                    src={blog3}
                    className="card-img-top rounded-top"
                    alt="..."
                  />
                  <div className="overlay rounded-top" />
                </div>
                <div className="card-body content">
                  <h5>
                    <a
                      href="javascript:void(0)"
                      className="card-title title text-dark"
                    >
                      Simple Condition for all Around Fitness
                    </a>
                  </h5>
                  <p className="text-muted mb-0">
                    The advantage of its Latin origin and the relative
                  </p>
                  <div className="post-meta d-flex justify-content-between mt-2">
                    <ul className="list-unstyled mb-0">
                      <li className="list-inline-item me-2 mb-0">
                        <a
                          href="javascript:void(0)"
                          className="text-muted like"
                        >
                          <i className="uil uil-heart me-1" />
                          33
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="javascript:void(0)"
                          className="text-muted comments"
                        >
                          <i className="uil uil-comment me-1" />
                          08
                        </a>
                      </li>
                    </ul>
                    <a href="blog-detail.html" className="text-muted readmore">
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
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
      {/* End */}
    </div>
  );
}
