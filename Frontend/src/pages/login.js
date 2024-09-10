import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom"; // Correct import for navigation
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import Modal from "../components/modalLoginSignup";
import { changeToken } from "../slice/token_slice";


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Ensure this hook is at the top level of the functional component
  const [isopen, setisopen] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");

  const clickhandler = async (e) => {
    e.preventDefault();
    const login = { username, password };
    console.log("Attempting to log in with:", process.env.REACT_APP_API_URL);

    try {
      console.log("Attempting to log in with:", login);
      //this is how you use .env var in vite and keep . env file where index.html is..
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login), // Send the login object as the request body
        credentials: "include", // Include cookies in the request if needed
      });
      const data = await response.json();

      if(response.ok){
        dispatch(changeToken(data.token));
      }
      
      console.log("Response from server:", data);
      
        setusername("");
        setpassword("");
        setmessage("Succesfully logged in !!");
       
    } catch (error) {
      console.error("Error logging-in:", error);
      setmessage("An error occurred while trying to log-in.");
    }

    setisopen(true);
  };

  return (
    <div className="whole">
    <Form className="wrapper">
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <MdEmail className="icon" />
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setusername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <FaLock className="icon" />
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
      </Form.Group>
      
      <Form.Group className="submit-btn">
        <Button className="submit" onClick={clickhandler}>
          Login
        </Button>
      </Form.Group>

      <Form.Group className="register">
        <Form.Text>Doesn't have an account? </Form.Text>
        <Link to="/signup">Register</Link>
      </Form.Group>

      <Modal
        open={isopen}
        navigateto={true}
      >
        {message}
      </Modal>
    </Form>
    </div>
  );
}
