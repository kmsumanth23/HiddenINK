import React from "react";
import ReactDom from "react-dom";
import { useNavigate } from "react-router-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  margin: "50px",
  zIndex: 1000,
};

export default function Modal({ open, children, navigateto }) {

  const navigate = useNavigate();
  const navigateHome = () => {
    
    navigate("/");
    window.location.reload();
    
  };

  const onclose = () => {
    
    navigate("/");
    window.location.reload();
    
  };

  

  return ReactDom.createPortal(
    open && (
      <>
        <div style={MODAL_STYLES}>
          {children}
          <div style={{ display: "flex" }}>
            <button
              onClick={onclose}
              style={{
                margin: "25px 100px 5px 30px",
                width: "50%",
                background: "red",
              }}
            >
              {" "}
              Close{" "}
            </button>
            {navigateto ? (
              <button className="mb-0"
                onClick={navigateHome}
                style={{ margin: "25px 30px 5px 100px", width: "50%" }}
                
              >
                {" "}
                Home{" "}
              </button>
            ):null}
          </div>
        </div>
      </>
    ),
    document.getElementById("portal")
  );
}
