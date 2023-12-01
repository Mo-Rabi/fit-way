//? Original code
import React, { useEffect, useRef, useState } from "react";
import styles from "./CloudinaryWidget.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function CloudinaryWidget() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;

  const userTyype = localStorage.getItem("userType");
  console.log("CLOUINARY USER TYPE: ", userTyype);
  let [imageURL, setImageURL] = useState("");
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dequqpbe8",
        uploadPreset: "cloudinary-custom-preset",
        cropping: "true",
        croppingCoordinatesMode: "custom",
      },

      async function (error, result) {
        // console.log("Result", result);
        let photoURL = result.info.secure_url;
        // console.log("URL", photoURL);
        if (photoURL) {
          setImageURL(photoURL);
          //getImageURL(photoURL);
          let response = await axios.patch(
            `http://localhost:4000/${userTyype}/edit/photo`,
            { picture: photoURL }
          );
          console.log("response", response);
        }
      }
    );
  }, []);
  console.log("Image URL outside", imageURL);

  return (
    <>
      <Link
        onClick={() => widgetRef.current.open()}
        className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
      >
        Change Photo
      </Link>
    </>
  );
}
