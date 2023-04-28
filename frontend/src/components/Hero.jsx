import React from "react";

function Hero() {
  return (
    <div>
      <section className="h-[calc(100vh-64px)] text-gray-600 body-font">
        <div className="h-full container mx-auto flex px-5 py-11 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="//d3qg9zffrnl4ph.cloudfront.net/web/static/build/sites/images/13d6c5fe8e92b99e0753a567112d9c94.png"
            />
          </div>
          <div className="h-64 lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Stay Organized with
              <br className="hidden lg:inline-block" />
              <span className="font-black">To-Do</span>
            </h1>
            <p className="mb-8 text-xl leading-relaxed">
              Join millions of people to capture ideas, organize life, and do
              something creative everyday.
            </p>
            <div className="flex justify-center">
              <a href="#/signup/email_id">
                <div className="flex text-black bg-transparent p-6 place-content-center border-2 hover:border-4 rounded-lg border-black py-2 focus:outline-none transition-all hover:text-lg hover:font-bold hover:scale-x-105">
                  Get Started - It's Free!
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
