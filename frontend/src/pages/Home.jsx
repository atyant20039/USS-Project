import React from "react";
import Hero from "../components/Hero";
import Header from "../components/Header";

function Home() {
  return (
    <div>
      <Header login={true} signup={true} logout={false} />
      <Hero />
    </div>
  );
}

export default Home;
