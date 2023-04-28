import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function SignupEmail() {
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // let errors;
  // try {
  //   errors = location.err;
  //   setError(errors);
  // } catch (e) {
  //   console.log(e);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullname = document.getElementById("fullname").value;
    const emailid = document.getElementById("email").value;
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;

    if (!emailid || !password1 || !fullname || !password2) {
      setError("Please enter all required inputs.");
      return;
    }

    if (password1 != password2) {
      setError("Passwords do not match.");
      return;
    }

    navigate("/signup/face_id", {
      replace: true,
      state: { name, email, password },
    });

    // axios
    //   .post("/api/auth/signUp", {
    //     name: fullname,
    //     email: email,
    //     password: password2,
    //   })
    //   .then(() => {
    //     // handle successful response
    //     navigate("/signup/face_id", { replace: true });
    //   })
    //   .catch((error) => {
    //     // handle error
    //     setError(error.response.data.message);
    //   });
  };

  return (
    <div>
      <Header login={true} signup={false} logout={false} />

      <section className="text-gray-600 body-font md:h-[calc(100vh-64px)]">
        <div className="h-full container px-5 mx-auto flex flex-wrap items-center">
          <div className="ml-10 lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Give yourself a Productivity Boost with&nbsp;
              <br className="hidden lg:inline-block" />
              <b className="font-extrabold">To-Do</b>
            </h1>
            <p className="leading-relaxed mt-4 text-lg">
              Create a New Account to Continue
            </p>
          </div>
          <div className="h-[calc(100vh-85px)] lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <form onSubmit={handleSubmit}>
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Sign Up
              </h2>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  id="password1"
                  name="password1"
                  placeholder="Enter Password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  placeholder="Confirm Password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <button className="w-full" type="submit">
                <div className="flex text-black bg-transparent place-content-center border-2 hover:border-4 rounded-lg border-black py-2 focus:outline-none transition-all hover:text-lg hover:font-bold hover:scale-x-105">
                  Next Step
                </div>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignupEmail;
