import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

function LoginEmail() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    axios
      .post("/api/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // handle successful response
        navigate("/todo", { replace: true });
      })
      .catch((error) => {
        // handle error
        setError(error.response.data.message);
      });
  };

  return (
    <div>
      <Header login={false} signup={true} logout={false} />

      <section className="md:h-[calc(100vh-64px)] flex text-gray-600 body-font content-center">
        <div className="container h-full mx-auto flex px-5 md:flex-row flex-col items-center">
          <div className="h-80 lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <form method="POST" onSubmit={handleSubmit}>
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Login
              </h2>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <button type="submit" className="w-full">
                <div className="w-full flex text-black bg-transparent place-content-center border-2 hover:border-4 rounded-lg border-black py-2 focus:outline-none transition-all hover:text-lg hover:font-bold hover:scale-x-105">
                  Login
                </div>
              </button>
            </form>
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Welcome Back to&nbsp;
              <br className="hidden lg:inline-block" />
              <b className="font-extrabold">To-Do</b>
            </h1>
            <p className="mb-8 leading-relaxed text-lg">
              Login to continue to your account.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginEmail;
