import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatPopup.module.css";
import Client from "../assets/client/01.jpg";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

export default function ChatPopup({ trainerProp, userProp }) {
  //!Navigate to the most recent chat message
  const messagesEndRef = useRef(null);

  console.log("TRAINER PROP FROM PARENT TO CHILDREN: ", trainerProp);
  console.log("USERRR PROP FROM PARENT TO CHILDREN: ", trainerProp);
  const [senderPhoto, setSenderPhoto] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const userType = localStorage.getItem("userType");
  const userToken = localStorage.getItem("token");
  const userId = jwtDecode(userToken).id;
  const trainerId = useParams().id;
  //! Retrieve trainer data

  //! Retrieve Chat
  const chatDataQuery = useQuery({
    queryKey: ["chatData"],
    queryFn: async () => {
      let { data } = await axios.get(
        `http://localhost:4000/chats/${trainerId}`
      );
      console.log("MESSAGES DATA???", data);
      const messagesData = data.allMessages;
      console.log("All Messages Data", messagesData);
      return messagesData;
    },
  });

  //!Navigate to the most recent chat message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatDataQuery.data]);

  //! Send messages
  const onSubmit = async (data) => {
    //******* chatDataQuery.refetch();
    try {
      if (userType === "trainer") {
        toast.error("Trainers can't message other trainers!");
      } else if (userType === "user") {
        data.userToken = localStorage.getItem("token");
        // data.trainerId = trainerId;
        // Time of message sent
        const messageDate = new Date();
        data.messageDate = messageDate;
        data.senderFirstName = userProp.firstName;
        data.senderLastName = userProp.lastName;
        data.senderPicture = userProp.picture;
        data.recipientId = trainerId;
        data.senderId = userProp._id;
        console.log("DATA TO BEEEZ SENT: ", data);

        // Send message details to chats Collection in DB
        let response = await axios.post("http://localhost:4000/chats/", data);
        console.log("Message sent?", response.data.message);
        //   //** Fetch the reviews again
        chatDataQuery.refetch();
        // Clear the form
        reset();
        toast.success("The Trainer will get back to you ASAP!");
        // } else {
        //   toast.success("Please log in first!");
      }
    } catch (error) {
      let errorMsg = error.response.data.error.message;
      let errorStatus = error.response.status;
      console.log({ error: "ERRRRRRRORRRRRR", errorStatus, errorMsg });
      //   setApiResponse({
      //     message: errorMsg,
      //     status: errorStatus,
      //   });
      //   console.log("Api Res: ".apiResponse);
    }
  };

  //! Get sender details (current logged in details)
  //? This is the token of the person logged in, Trainer or User
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;

  const getSenderData = async () => {
    try {
      let response = await axios.get(`http://localhost:4000/${userType}Data`);
      const senderData = response.data.userData;
      setSenderPhoto(senderData?.picture);
      console.log("Sender Photo", senderPhoto);
    } catch (error) {
      console.log("Error getting sender data: ,", error);
    }
  };
  getSenderData();

  //! Filter Messages data to get messages between the logged-in user and the trainer user is currently standing over. check messages for sender is the user and recipient is the trainer (and vice versa)
  //? Messages sent by user
  let messagesSentByUser = chatDataQuery.data?.filter((userMessage) => {
    return userMessage.senderId === userId;
  });

  //? Messages sent by trainer
  let messagesSentByTrainer = chatDataQuery.data?.filter((trainerMessage) => {
    return trainerMessage.senderId === trainerId;
  });

  //Loading state
  if (chatDataQuery.isLoading) return <h1>Loading...</h1>;
  if (chatDataQuery.isError)
    return <pre>{JSON.stringify(chatDataQuery.error)}</pre>;

  return (
    <div
      className="col-3 card chat chat-person border-0 shadow rounded p-1 py-2"
      style={{
        position: "fixed",
        marginLeft: "72%",
        marginTop: "10%",
        zIndex: 1,
      }}
    >
      <div className="d-flex justify-content-between border-bottom px-3">
        <div className="d-flex">
          <img
            src={trainerProp.picture}
            className="avatar avatar-md-sm rounded-circle border shadow"
            alt
          />
          <div className="overflow-hidden ms-3">
            <a href="#" className="text-dark mb-0 h6 d-block text-truncate">
              {trainerProp.firstName} {trainerProp.lastName}
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

      <ul
        className="p-3 list-unstyled mb-0 chat"
        data-simplebar
        style={{
          background: 'url("assets/images/account/bg-chat.png") center center',
          maxHeight: 400,
          minHeight: 400,
          overflowY: "auto",
        }}
      >
        {/*//! User Messages */}
        {/* {chatDataQuery.data ? (
         chatDataQuery.data.length ? ( */}
        {chatDataQuery.data && chatDataQuery.data.length ? (
          chatDataQuery.data.map((message, index) => (
            <li
              key={index}
              className={message.senderId === userId ? "chat-right" : ""}
            >
              {(message.senderId === userId &&
              message.recipientId === trainerId) || (message.senderId === trainerId &&
                message.recipientId === userId) ? (
                <div className="d-inline-block">
                  <div className="d-flex chat-type mb-3">
                    <div className="position-relative chat-user-image">
                      <img
                        src={message.senderPicture}
                        className="avatar avatar-md-sm rounded-circle border shadow"
                        alt=""
                      />
                      <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom" />
                    </div>
                    <div className="chat-msg" style={{ maxWidth: 500 }}>
                      <p className="text-muted small msg px-3 py-2 bg-light rounded mb-1">
                        {message.message}
                      </p>
                      <small className="text-muted msg-time">
                        <i className="uil uil-clock-nine me-1" />
                        {new Date(message.messageDate).toLocaleString()}
                      </small>
                    </div>
                  </div>
                </div>
              ) : null}
            </li>
          ))
        ) : (
          <li className="chat-right">
            <p className="text-muted">
              Message Me
              <small className="fw-bold text-success"> Now!</small>
            </p>
          </li>
        )}

        {/* //! Trainer Messages
          {messagesSentByTrainer.map((message, index) => (
          <li>
            <div className="d-inline-block">
              <div className="d-flex chat-type mb-3">
                <div className="position-relative">
                  <img
                    src={message.senderPicture}
                    className="avatar avatar-md-sm rounded-circle border shadow"
                    alt
                  />
                  <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom" />
                </div>
                <div className="chat-msg" style={{ maxWidth: 500 }}>
                  <p className="text-muted small msg px-3 py-2 bg-light rounded mb-0">
                    {message.message}
                  </p>
                  <small className="text-muted msg-time">
                    <i className="uil uil-clock-nine me-1" />
                    {new Date(message.messageDate).toLocaleString()}
                  </small>
                </div>
              </div>
            </div>
          </li>
        ))} */}
      </ul>

      <div className="p-1 rounded-bottom shadow">
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="form-control d-inline"
                placeholder="Enter Message..."
                {...register("message")}
              />
              <button
                type="submit"
                className="btn btn-icon btn-primary"
                style={{
                  position: "fixed",
                  marginLeft: "-3.5%",
                  marginTop: "0.3%",
                }}
              >
                <i className="uil uil-message " />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
