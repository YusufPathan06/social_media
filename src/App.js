import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from "./pages/home";
import Login from "./pages/login";

function App() {
  return (
    <div>
    <ToastContainer />
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
