import Home from "./pages/Home";
import LoginFace from "./pages/LogicFace";
import LoginEmail from "./pages/LoginEmail";
import SignupEmail from "./pages/SignupEmail";
import SignupFace from "./pages/SignupFace";
import Todo from "./pages/Todo";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login/face_id" element={<LoginFace />} />
          <Route path="/login/email_id" element={<LoginEmail />} />
          <Route path="/signup/email_id" element={<SignupEmail />} />
          <Route path="/signup/face_id" element={<SignupFace />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
