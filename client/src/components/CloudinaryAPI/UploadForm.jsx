import React, { useState, useRef } from "react";
import axios from "axios";
import bg from "../assets/images/gym/bg2.jpg";

const UploadForm = () => {
  console.log("Inside Cloudinary component");
  const api_key = "691199169282346";
  const cloud_name = "dequqpbe8";
  const preset_key = "cloudinary-custom-preset";
  const fileInput = useRef();
  const [progress, setProgress] = useState(0); // Initialize progress state

  //* New code
  const [image, setImage] = useState();

  const handleFile = async (event) => {
    //* New code
    const file = event.target.files[0];
    // console.log("File using event.target", file);
    // console.log("File Input using href", fileInput);
    // console.log("Inside handle submit");
    const data = new FormData();
    data.append("upload_preset", preset_key);

    data.append("file", file);
    data.append("upload_preset", preset_key);
    //?data.append("api_key", api_key);
    console.log("Data", data);
    data.append("upload_preset", preset_key);

    //! Cloudinary responds with Upload reset must be specified
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function (e) {
          const progressValue = (e.loaded / e.total) * 100;
          setProgress(progressValue.toFixed()); // Update progress state
          console.log(progressValue);
        },
      }
    );

    console.log("Cloudinary Response", cloudinaryResponse);

    //? const picture = cloudinaryResponse.data.secure_url;
    setImage(cloudinaryResponse.data.secure_url);
    console.log("Image to be sent to DB", image);

    const token = localStorage.getItem("token");
    axios.patch("http://localhost:4000/trainer/edit", { image, token });
  };

  return (
    <div className="">
      <div className="">
        <form id="upload-form">
          <input
            type="file"
            id="file-field"
            // ref={fileInput}
            accept="image/*"
            className="btn btn-outline-success mt-2 ms-2"
            onChange={handleFile}
          />
          {/* <input
            type="submit"
            value="Upload"
            className="btn btn-primary mt-2 ms-2"
          /> */}
          <div className="progress mt-2">
            <div
              className="progress-bar position-relative bg-primary"
              style={{ width: `${progress}%` }}
            >
              <div className="progress-value d-block text-dark h6 mt-2">
                {progress == 100 ? "Upload Successful" : `${progress}%`}
              </div>
            </div>
            <img src={image} alt="" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
