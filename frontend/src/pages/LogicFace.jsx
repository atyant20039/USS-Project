import React from "react";
import Header from "../components/Header";
import Camera from "../components/Camera";

function LogicFace() {
  return (
    <div>
      <Header login={false} signup={true} logout={false} />
      <Camera login={true} />
    </div>
  );
}

export default LogicFace;
