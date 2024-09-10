
import "./CSS/userprofile.css";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutToken } from "../slice/token_slice";

export default function Userprofile(props){
     
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const logout = () => {
            dispatch(logoutToken());
            console.log('Logout successful:');
            navigate('/login');
            window.location.reload(); 
    };
    
    

    const [active, changeclasss] = useState("");
     const imgclick = () => {
        if(active===""){
            changeclasss("active");
        }
        else changeclasss("");
      };

      const deleteCookie = (name) => {
        document.cookie = name;
    };
    

    return(

        <>
        <div className="bodymainproifle">
      <div className="containerprofile">
         <div className="wrapperprofile">
            <a href="#">
            <img className={`imgprof ${active}`} onclick={imgclick} src="../images/profile_icon.jpg" />
            </a>
            <div className="titleprof">
            {props.logged_u.nickname}
            </div>
            <div className="placeprof">
            {props.logged_u.username}
            </div>
         </div>
         <div className="contentprof">
            <p>
               {/* User Interface Designer and <br/>front-end developer */}
            </p>
            <div className="buttonsprof">
               <div className="btnprof">
                  <button className="buttonz" onClick={logout}>Logout</button>
               </div>
            </div>
         </div>
         
      </div>
      

</div>
        </>
    );
}