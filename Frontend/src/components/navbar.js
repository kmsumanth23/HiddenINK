import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Userprofile from "./userprofileIcon";
import "./CSS/navbar.css";

function Navbar(props) {
  const [dark, changetheme] = useState(false);

  window.addEventListener("scroll", () => {
    console.log(window.scrollY);
    if (window.scrollY >= 80) {
      changetheme(true);
    } else {
      changetheme(false);
    }
  });

  const navigate = useNavigate();
  const clickhandler = () => {
    navigate("/login");
  };

  return (
    <>     
      <nav
        className={          
          "navbar navbar-expand-sm navbar-dark fixed-top "
        }
        style={{ backgroundColor: "rgb(2, 2, 62)", color: "#fff" }}
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            STEGO-FROG
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/stagt">
                  Encrypt
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link" to="/stagp">
                  Decrypt
                </NavLink>
              </li>
              <li className="nav-item dis">
                {props.flag == true && (
                  <Userprofile logged_u={props.logged_user} />
                )}
                {props.flag == false && (
                  <button
                    className="btn btn-primary signin_btn"
                    type="button"
                    onClick={clickhandler}
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
