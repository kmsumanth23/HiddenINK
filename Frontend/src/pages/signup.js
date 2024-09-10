import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { changeToken } from "../slice/token_slice";
import "./signup.css";
import Modal from "../components/modalLoginSignup";

export default function Signup() {
  const [nickname, setnickname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate(); // Ensure this hook is at the top level of the functional component

  const clickhandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Log the data being sent
    console.log("Attempting to register with data:", {
      nickname,
      username,
      password,
    });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickname, username, password }), // Correctly stringify the body
          credentials: "include", // Include cookies in the request if needed
        } 
      );
      const data = await response.json();

      if(response.ok){
        dispatch(changeToken(data.token));
      }

      console.log("Response from server:", data);
        setmessage("Registered successfully!");
        setnickname("");
        setusername("");
        setpassword("");
        

    } catch (error) {
      console.error("Error during registration:", error);

      // Log the response data if available
      if (error.data) {
        console.error("Error response data:", error.data.data);
        console.error("Error response status:", error.data.status);
      }
      setmessage("An error occurred during registration.");
    }
    setopen(true);
  };

  return (
    <div className="whole">
    <Form className="wrapper">
      <Form.Group className="mb-3">
        <Form.Label>User-name</Form.Label>
        <FaUser className="icon" />
        <Form.Control
          placeholder="Enter your name"
          onChange={(e) => setnickname(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Id</Form.Label>
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
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
      <Form.Group className="submit-btn">
        <Button className="submit" onClick={clickhandler}>
          Register
        </Button>
      </Form.Group>

      <Modal open={open} navigateto={true}>
        {message}
      </Modal>

      <Form.Group className="login">
        <Form.Text>Already have an account? </Form.Text>
        <Link to="/login">Login</Link>
      </Form.Group>
    </Form>
    </div>
  );
}
