import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Camera(props) {
  const [captureButton, setCaptureButton] = useState(true);
  const [retryButton, setRetryButton] = useState(false);
  const [confirmButton, setConfirmButton] = useState(false);
  const [error, setError] = useState(null);
  const [img, setImage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  let Name, Email, Password;
  if (location.state) {
    Name = location.state.name;
    Email = location.state.email;
    Password = location.state.password;
  }

  let videoRef = useRef(null);
  let photoRef = useRef(null);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        // attach the stream to the video tag
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // to take picture of user
  const takePic = async () => {
    let width = 1280;
    let height = width / (16 / 9);
    let photo = photoRef.current;
    let video = videoRef.current;
    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, photo.width, photo.height);
    if (props.login === false) {
      setCaptureButton(false);
    }
    setRetryButton(true);

    // Checking if the image contains a face or not
    // get the image data as a base64 encoded string
    let imageData = photo.toDataURL("image/jpeg");
    setImage(imageData);

    // send the image data to backend using axios
    axios
      .post("/api/auth/checkFace", { image: imageData })
      .then((response) => {
        // handle success response here
        let isf = response.data.isFace;
        if (isf) {
          if (props.login === true) {
            axios
              .post("/api/auth/login", {
                image: imageData,
              })
              .then((response) => {
                navigate("/todo", { replace: true });
              })
              .catch((error) => {
                console.log(error);
                setError(error.response.data.message);
              });
          } else {
            setConfirmButton(true);
          }
        } else {
          setError("No Face Detected");
        }
      })
      .catch((error) => {
        // handle error response here
        console.log(error);
        setError(error.response.data.message);
      });
  };

  const clearPic = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    setCaptureButton(true);
    setRetryButton(false);
    setConfirmButton(false);
  };

  const createNewUser = () => {
    axios
      .post("/api/auth/signUp", {
        name: Name,
        email: Email,
        password: Password,
        image: img,
      })
      .then((response) => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        // if (error.response.data.message == "Email already registered.") {
        //   navigate("/auth/signup/email_id", {
        //     replace: true,
        //     err: "Email already registered.",
        //   });
        // } else {
        setError(error.response.data.message);
        // }
      });
  };

  // getting access to user webcamera
  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  return (
    <div className="md:h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] w-screen">
      <div className="w-full h-80 flex place-content-center">
        <video className="rounded-full scale-75" ref={videoRef}></video>
        <canvas className="rounded-full scale-75" ref={photoRef}></canvas>
      </div>
      {error && (
        <div className="text-red-500 font-bold text-lg w-full place-content-center flex">
          {error}
        </div>
      )}
      <div className="flex grid place-content-center md:h-32 lg:h-32">
        <button
          className="flex w-28 h-fit p-4 m-2 disabled:opacity-50 text-black bg-transparent place-content-center border-2 disabled:hover:border-2 hover:border-4 rounded-lg border-black py-2 focus:outline-none transition-all disabled:hover:text-md hover:text-lg disabled:hover:font-normal hover:font-bold disabled:hover:scale-100 hover:scale-105"
          onClick={takePic}
          disabled={!captureButton}
        >
          Capture
        </button>
        {props.login === true ? (
          // verify the face
          <></>
        ) : (
          <button
            onClick={clearPic}
            className="flex w-28 h-fit p-4 m-2 disabled:opacity-50 text-black bg-transparent place-content-center border-2 disabled:hover:border-2 hover:border-4 rounded-lg border-black py-2 focus:outline-none transition-all disabled:hover:text-md hover:text-lg disabled:hover:font-normal hover:font-bold disabled:hover:scale-100 hover:scale-105"
            disabled={!retryButton}
          >
            Retry
          </button>
        )}
      </div>
      {/* <canvas ref={photoRef}></canvas> */}

      {props.login === true ? (
        <div className="flex justify-between">
          <div></div>
          <a
            className="mr-6 place-content-end text-gray-600 text-lg hover:text-gray-900 font-semibold"
            href="#/login/email_id"
          >
            Login with Email
          </a>
        </div>
      ) : (
        <div className="flex justify-between mx-6">
          <a
            href="#/signup/email_id"
            className="flex w-28 h-fit p-4 m-2 disabled:opacity-50 text-black bg-transparent place-content-center border-2 disabled:hover:border-2 hover:border-4 rounded-lg border-black py-2 focus:outline-none transition-all disabled:hover:text-md hover:text-lg disabled:hover:font-normal hover:font-bold disabled:hover:scale-100 hover:scale-105"
          >
            Back
          </a>
          <button
            disabled={!confirmButton}
            className="flex w-28 h-fit p-4 m-2 disabled:opacity-50 text-black bg-transparent place-content-center border-2 disabled:hover:border-2 hover:border-4 rounded-lg border-black py-2 focus:outline-none transition-all disabled:hover:text-md hover:text-lg disabled:hover:font-normal hover:font-bold disabled:hover:scale-100 hover:scale-105"
            onClick={createNewUser}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

export default Camera;
