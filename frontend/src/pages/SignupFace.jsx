import React from "react";
import Header from "../components/Header";
import Camera from "../components/Camera";

function SignupFace() {
  return (
    <div>
      <Header login={false} signup={false} logout={false} />
      <Camera login={false} />
    </div>
  );
}

export default SignupFace;
