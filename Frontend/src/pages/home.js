import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Correct import for navigation
// import PNavbar from "../components/navbar.jsx";
import Splinemodel from "../components/spline.js";
import "../index.css";
import About from "../components/about.js";
import FeedbackForm from "./feedback.js";
import Steganography from "./stagt2p.js";
import Stag2 from "./stagp2t.js";

export default function Home() {
  const navigate = useNavigate();
  const stagpage = () => {
    navigate("/stagt");
  };

  var feedback_color = "linear-gradient(to top, #f77062 0%, #fe5196 100%)";

  return (
    <>
      {/* <PNavbar /> */}
      <div className="homepage ">
        <Splinemodel />
      </div>

      <div className="landing_page_content">
        <div className="">
          <h1 className="landing_page_h1">Welcome to the realm of </h1>
          <h1 className="landing_page_h1">Steganography</h1>
        </div>
        <div className="landing_page_text">
          <p>
            <br></br>
            <br></br>
            Our Grandmaster Froggy, the legendary Archmage Amphibius, uses his
            extraordinary wizardry to embed your messages within pictures.
            <br></br>
            Step into this intriguing world and explore the art of hidden
            communication like never before..
          </p>
          <div className="">
            <button
              type="button"
              onClick={stagpage}
              class="btn btn-outline-warning bbold"
            >
              Hide Message
            </button>
          </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#8b73c4"
          fill-opacity="1"
          d="M0,96L40,122.7C80,149,160,203,240,186.7C320,171,400,85,480,90.7C560,96,640,192,720,245.3C800,299,880,309,960,261.3C1040,213,1120,107,1200,74.7C1280,43,1360,85,1400,106.7L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
      <About />
      <Steganography logged_user={"null"}/>
      <Stag2 logged_user={"null"}/>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#fe5196"
          fill-opacity="1"
          d="M0,224L48,229.3C96,235,192,245,288,245.3C384,245,480,235,576,208C672,181,768,139,864,138.7C960,139,1056,181,1152,208C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <FeedbackForm maincol={feedback_color} />
    </>
  );
}
