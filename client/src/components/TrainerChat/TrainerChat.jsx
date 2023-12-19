import React, { useState, useRef, useEffect } from "react";
import styles from "./TrainerChat.module.css";
import bg from "../assets/account/bg.png";
import clientPhoto from "../assets/client/01.jpg";
import Circleci from "../assets/images/job/Circleci.svg";
import Gitlabb from "../assets/images/job/Gitlab.svg";
import CodePen from "../assets/images/job/Codepen.svg";
import blog1 from "../assets/images/blog/01.jpg";
import blog2 from "../assets/images/blog/02.jpg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Link, useNavigate } from "react-router-dom";
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
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import Spinner from "react-bootstrap/Spinner";

export default function TrainerChat() {
  //? Track the selected user to display their chat with the trainer
  const [selectedUser, setSelectedUser] = useState(null);

  // //!Navigate to the most recent chat message
  // const messagesEndRef = useRef(null);
  //Handle chat popup
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const trainerToken = localStorage.getItem("token");
  const trainerId = jwtDecode(trainerToken).id;
  axios.defaults.headers.common["Authorization"] = trainerToken;
  console.log("TRAINER IDDDDDDD OUTSIDE: ", trainerId);

  const { register, handleSubmit, reset } = useForm();

  //! Retrieve Chat
  const chatDataQuery = useQuery({
    queryKey: ["chatData"],
    queryFn: async () => {
      let { data } = await axios.get(
        `https://fitway-backend.onrender.com/chats/${trainerId}`
      );
      const messagesData = data.allMessages;
      console.log("MESSAGES DATA???", messagesData);
      return messagesData;
    },
  });
  console.log("Chat Data Query: ", chatDataQuery.data);

  //? When a user is clicked, display the conversation between the clicked user and trainer

  const selectedUserId = selectedUser;
  console.log("SELECTED USER ID: ", selectedUserId);
  console.log("TRAINER ID: ", trainerId);

  const conversation = chatDataQuery.data?.filter(
    (message) =>
      (message.senderId === trainerId &&
        message.recipientId === selectedUserId) ||
      (message.senderId === selectedUserId && message.recipientId === trainerId)
  );

  console.log("CONVERSATION: ", conversation);

  // console.log(
  //   "Chat Data Query FirstName: ",
  //   chatDataQuery.data[0].senderFirstName
  // );
  // //!Navigate to the most recent chat message
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [chatDataQuery.data]);

  const userType = localStorage.getItem("userType");
  //! Send messages
  const onSubmit = async (data) => {
    // console.log("DATA INSIDE SUBMIT??? ", data);
    chatDataQuery.refetch();
    try {
      if (userType === "user") {
        toast.error("Please Login as a Trainer to perform this action!");
      } else if (userType === "trainer") {
        console.log("DATA INSIDE ELSE IF ??? ", data);
        // data.trainerId = trainerId;
        console.log("DATA AFTER TRAINER ID INSIDE ONSUBMIT FN: ", data);
        //Time of message sent
        const messageDate = new Date();
        data.messageDate = messageDate;
        data.senderFirstName = trainerDataQuery.data?.firstName;
        data.senderLastName = trainerDataQuery.data?.lastName;
        data.senderPicture = trainerDataQuery.data?.picture;
        data.senderId = trainerDataQuery.data?._id;
        //[x]TODO Recepient ID needs to conform to selected user ID
        data.recipientId = selectedUserId;

        console.log("DATA OF TRAINER Message: ", data);

        //Send message details to chats Collection in DB
        let response = await axios.post("https://fitway-backend.onrender.com/chats/", data);
        console.log("Message sent?", response.data.message);
        //** Fetch the reviews again
        chatDataQuery.refetch();
        // Clear the form
        reset();
        toast.success("Message sent successfully!");
        // } else {
        //   toast.success("Please log in first!");
      }
    } catch (error) {
      // let errorMsg = error.response.data.error.message;
      // let errorStatus = error.response.status;
      // console.log({ error: "ERRRRRRRORRRRRR", errorStatus, errorMsg });
      console.log("Error: ", error);
      //   setApiResponse({
      //     message: errorMsg,
      //     status: errorStatus,
      //   });
      //   console.log("Api Res: ".apiResponse);
    }
  };
  //! Retrieve Trainer Details
  const trainerDataQuery = useQuery({
    queryKey: ["trainerData"],
    queryFn: async () => {
      let { data } = await axios.get("https://fitway-backend.onrender.com/trainerData/");
      console.log("Data", data);
      const trainerData = data.trainerData;
      console.log("Trainer Data: ", trainerData);
      return trainerData;
    },
  });

  if (trainerDataQuery.isFetching)
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
  if (trainerDataQuery.isError)
    return <pre>{JSON.stringify(trainerDataQuery.error)}</pre>;

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    window.location.href = "/";
  };

  //! Filtered messages sent by trainer
  let messagesSentByTrainer = chatDataQuery.data?.filter(
    (message) => message.senderId === trainerDataQuery.data._id
  );
  console.log(
    "Messages sent by Trainer: ",
    messagesSentByTrainer,
    "Number of Messages: ",
    messagesSentByTrainer?.length
  );

  //! Filtered messages sent by users
  let messagesSentByUsers = chatDataQuery.data?.filter(
    (message) => message.senderId != trainerDataQuery.data._id
  );
  console.log(
    "Messages sent by Users: ",
    messagesSentByUsers,
    "Number of Messages: ",
    messagesSentByUsers?.length
  );

  //! Filter messages sent by users to get selected users data
  let selectedUsersData = messagesSentByUsers?.filter((user, index, self) => {
    return self.findIndex((t) => t.senderId === user.senderId) === index;
  });

  //! for the top portion of chat
  let selectedUserData = selectedUsersData?.find(
    (user) => user.senderId === selectedUserId
  );

  console.log("SELECTED USERS DATA: ", selectedUsersData);
  //! Filter messages by separating messages according to each user************************************
  let messagesBySender = {};

  messagesSentByUsers?.forEach((message) => {
    if (!messagesBySender[message.senderId]) {
      messagesBySender[message.senderId] = [];
    }
    messagesBySender[message.senderId].push(message);
  });
  console.log(
    "Messages by each Sender: ",
    messagesBySender,
    "Number of Users: ",
    Object.keys(messagesBySender)?.length
  );

  // //! List all user details according to the senderId
  // let userDetailsBySender = messagesSentByUsers.reduce((acc, message) => {
  //   if (!acc[message.senderId]) {
  //     acc[message.senderId] = {
  //       senderId: message.senderId,
  //       senderFirstName: message.senderFirstName,
  //       senderLastName: message.senderLastName,
  //       senderPicture: message.senderPicture,
  //     };
  //   }
  //   return acc;
  // }, {});

  // console.log("User Details By Sender: ", userDetailsBySender);
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
                        src={trainerDataQuery.data.picture}
                        className="avatar avatar-large rounded-circle shadow d-block mx-auto"
                      />
                    </div>
                    {/*end col*/}
                    <div className="col-lg-10 col-md-9">
                      <div className="row align-items-end">
                        <div className="col-md-7 text-md-start text-center mt-4 mt-sm-0">
                          <h3 className="title mb-0">
                            {trainerDataQuery.data.firstName + " "}
                            {trainerDataQuery.data.lastName}
                          </h3>
                          <small className="text-muted h6 me-2">
                            {trainerDataQuery.data.title ||
                              "Go to profile settings to edit your Title"}
                          </small>
                          <ul className="list-inline mb-0 mt-3">
                            <li className="list-inline-item me-3">
                              <a
                                href=""
                                className="text-muted"
                                title="Instagram"
                              >
                                <Instagram className="me-1 mb-1" />
                                {trainerDataQuery.data.firstName}_
                                {trainerDataQuery.data.lastName}
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                href=""
                                className="text-muted"
                                title="Linkedin"
                              >
                                <Linkedin className="me-1 mb-1" />
                                {trainerDataQuery.data.firstName}-
                                {trainerDataQuery.data.lastName}
                              </a>
                            </li>
                          </ul>
                        </div>
                        {/*end col*/}
                        <div className="col-md-5 text-md-end text-center">
                          <ul className="list-unstyled social-icon social mb-0 mt-4">
                            <li className="list-inline-item me-1">
                              <Link
                                to={"/trainer/profile"}
                                className="rounded"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title="Add Friend"
                              >
                                <i className="uil uil-user-plus align-middle " />
                              </Link>
                            </li>
                            <li className="list-inline-item me-1">
                              <Link
                                to={"/trainer/chat"}
                                className="rounded"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title="Messages"
                              >
                                <i className="uil uil-comment align-middle" />
                              </Link>
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
                            <li className="list-inline-item me-1">
                              <Link
                                to={"/trainer/settings"}
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
                      <p className="text-muted mb-0">Trainess</p>
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
                      <a className="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
                        <span className="h4 mb-0">
                          <i className="uil uil-dashboard" />
                        </span>
                        <h6 className="mb-0 ms-2">
                          <Link className="text-dark" to={"/trainer/profile"}>
                            Profile
                          </Link>
                        </h6>
                      </a>
                    </li>
                    <li className="navbar-item account-menu px-0 mt-2">
                      <a
                        href="account-members.html"
                        className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                      >
                        <span className="h4 mb-0">
                          <i className="uil uil-trainers-alt" />
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
                      <a
                        href="account-setting.html"
                        className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                      >
                        <span className="h4 mb-0">
                          <i className="uil uil-setting" />
                        </span>
                        <h6 className="mb-0 ms-2">
                          <Link className="text-dark" to={"/trainer/settings"}>
                            Settings
                          </Link>
                        </h6>
                      </a>
                    </li>
                    <li className="navbar-item account-menu px-0 mt-2">
                      <Link
                        to={""}
                        className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                      >
                        <span className="h4 mb-0">
                          <i className="uil uil-dashboard" />
                        </span>
                        <h6 className="mb-0 ms-2" onClick={Logout}>
                          Logout
                        </h6>
                      </Link>
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
              {/*//! Users who messaged the Trainer */}
              {Object.keys(messagesBySender).map((senderId) => {
                const messages = messagesBySender[senderId];

                // Get the last message from the array
                const lastMessage = messages[messages.length - 1];

                return (
                  <div className="card border-0 rounded shadow" key={senderId}>
                    <div
                      className="p-2 chat chat-list"
                      data-simplebar
                      style={{ maxHeight: 360, overflowY: "auto" }}
                    >
                      <a
                        className={`d-flex chat-list p-2 rounded position-relative`}
                        key={lastMessage._id}
                        style={{cursor:"pointer"}}
                      >
                        <div className="position-relative">
                          <img
                            src={lastMessage.senderPicture}
                            className="avatar avatar-md-sm rounded-circle border shadow"
                            alt
                          />
                          <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom" />
                        </div>
                        <div
                          className="overflow-hidden flex-1 ms-2"
                          onClick={() => setSelectedUser(senderId)}
                        >
                          <div className="d-flex justify-content-between">
                            <h6 className="text-dark mb-0 d-block">
                              {lastMessage.senderFirstName}{" "}
                              {lastMessage.senderLastName}
                            </h6>
                            <small className="text-muted">
                              {new Date(lastMessage.messageDate).getMinutes()}{" "}
                              min
                            </small>
                          </div>
                          <div className="text-muted text-truncate">
                            {lastMessage.message}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                );
              })}

              {/*//!  TOP PORTION: Messages between The selected user and the logged-in trainer */}
              <div className="card chat chat-person border-0 shadow rounded mt-4">
                <div className="d-flex justify-content-between border-bottom p-4">
                  <div className="d-flex">
                    <img
                      src={selectedUserData?.senderPicture}
                      className="avatar avatar-md-sm rounded-circle border shadow"
                      alt
                    />
                    <div className="overflow-hidden ms-3">
                      <a className="text-dark mb-0 h6 d-block text-truncate">
                        {selectedUserData?.senderFirstName}{" "}
                        {selectedUserData?.senderLastName}
                      </a>
                      <small className="text-muted">
                        <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom" />{" "}
                        Online
                      </small>
                    </div>
                  </div>
                  <ul className="list-unstyled mb-0">
                    <li className="dropdown dropdown-primary list-inline-item">
                      <button
                        type="button"
                        className="btn btn-icon btn-pills btn-soft-primary dropdown-toggle p-0"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="uil uil-ellipsis-h " />
                      </button>
                      <div className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow border-0 mt-3 py-3">
                        <a className="dropdown-item text-dark" href="#">
                          <span className="mb-0 d-inline-block me-1">
                            <i className="uil uil-user align-middle h6" />
                          </span>{" "}
                          Profile
                        </a>
                        <a className="dropdown-item text-dark" href="#">
                          <span className="mb-0 d-inline-block me-1">
                            <i className="uil uil-setting align-middle h6" />
                          </span>{" "}
                          Profile Settings
                        </a>
                        <a className="dropdown-item text-dark" href="#">
                          <span className="mb-0 d-inline-block me-1">
                            <i className="uil uil-trash align-middle h6" />
                          </span>{" "}
                          Delete
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                {/*//!  LOWER PORTION: Messages between The selected user and the logged-in trainer */}

                <ul
                  className="p-4 list-unstyled mb-0 chat"
                  data-simplebar
                  style={{
                    background:
                      'url("assets/images/account/bg-chat.png") center center',
                    maxHeight: 500,
                    overflowY: "auto",
                  }}
                >
                  {conversation?.map((chat, index) => (
                    <li
                      key={index}
                      className={
                        chat.senderId === selectedUserId ? "" : "chat-right"
                      }
                    >
                      <div className="d-inline-block">
                        <div className="d-flex chat-type mb-3">
                          <div className="position-relative">
                            <img
                              src={chat.senderPicture}
                              className="avatar avatar-md-sm rounded-circle border shadow"
                              alt
                            />
                            <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom" />
                          </div>
                          <div className="chat-msg" style={{ maxWidth: 500 }}>
                            <p className="text-muted small msg px-3 py-2 bg-light rounded mb-1">
                              {chat.message}
                            </p>
                            <small className="text-muted msg-time">
                              <i className="uil uil-clock-nine me-1" />
                              {new Date(chat.messageDate).getMinutes()} min ago
                            </small>
                          </div>
                        </div>
                      </div>
                      {/* <div ref={messagesEndRef} /> */}
                    </li>
                  ))}
                </ul>
                <div className="p-2 rounded-bottom shadow">
                  <div className="">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        type="text"
                        className="form-control d-inline-block"
                        placeholder="Enter Message..."
                        {...register("message")}
                      />

                      <button
                        type="submit"
                        className="btn btn-icon text-primary position-absolute mt-1"
                        style={{ marginLeft: "-5%" }}
                      >
                        <i className="uil uil-message" />
                      </button>
                    </form>
                  </div>
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
  );
}
