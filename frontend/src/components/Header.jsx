import React from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

function Header(props) {
  return (
    <header className="sticky top-0 z-30 w-full md:h-16 text-gray-600 body-font bg-white opacity-95 ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <EventAvailableIcon />
          <span className="ml-3 cursor-default font-semibold text-xl">
            To-Do
          </span>
        </div>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {props.login && (
            <a
              className="mr-5 font-semibold text-lg hover:text-gray-900"
              href="#/login/face_id"
            >
              Login
            </a>
          )}
          {props.signup && (
            <a
              className="mr-5 font-semibold text-lg hover:text-gray-900"
              href="#/signup/email_id"
            >
              Sign Up
            </a>
          )}
          {props.logout && (
            <a
              className="mr-5 font-semibold text-lg hover:text-red-600"
              href="#/"
            >
              Logout
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
