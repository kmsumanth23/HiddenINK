import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import Modal from "../components/modalstag";
import "./stagp2t.css";

export default function Stag2(props) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [image, setImage] = useState(null);
  const [extractedMessage, setExtractedMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [sender, setSender] = useState("$$$$$$$$$$$$$$$$$$$$$$$$");
  const [sendername, setSendername] = useState("Anonymous sender");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("$$$$$$$$$$$$$$$$$$$$$$$$");
  const imageCanvas2Ref = useRef(null);

  const fetch_sender = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/sendername/${sender}`);
      setSendername(res.data.username);
      console.log(`sendername: ${sendername}`);
      // return username;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch the sender's name whenever the sender state changes and it's a valid ID
    if (sender && sender !== "$$$$$$$$$$$$$$$$$$$$$$$$") {
      console.log("Fetching sender name for sender ID:", sender);
      fetch_sender();
    }
  }, [sender]); // Add sender as a dependency

  useEffect(() => {
    // Debug: Check props.logged_user directly
    console.log("Logged User from Props:", props.logged_user);

    if (props.logged_user._id) {
      setUser(props.logged_user._id);
    } else {
      setUser("$$$$$$$$$$$$$$$$$$$$$$$$");
    }
  }, [props.logged_user]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setExtractedMessage("");
      setSendername("Anonymous Sender");
      setImage(url);
      setFileUploaded(true);
    }
  };

  const extractMessage = (id_length) => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.setAttribute("crossOrigin", "");
    img.onload = () => {
      const canvas = imageCanvas2Ref.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data;
      const binaryData = [];

      for (let i = 0; i < pixelData.length; i++) {
        binaryData.push(pixelData[i] & 1);
      }

      let message = "";
      for (let i = 0; i < binaryData.length; i += 8) {
        const byte = binaryData
          .slice(i, i + 8)
          .reduce((acc, bit, index) => acc + (bit << (7 - index)), 0);
        const char = String.fromCharCode(byte);
        message += char;
        if (char === "\0") break; // Handle null-terminated strings
      }

      if (message.startsWith("Valid\n")) {
        const senderID = message.substring(6, 6 + id_length);
        const receiverID = message.substring(6 + id_length, 6 + 2 * id_length);
        const extractedMsg = message.slice(6 + 2 * id_length).replace("\0", "");

        // Update state accordingly
        setReceiver(receiverID);
        // setSender(senderID);      

        // Check if the message is meant for the current user
        if ( receiverID!=="$$$$$$$$$$$$$$$$$$$$$$$$" && user !== receiverID) {
          setIsOpen(true); // Show modal if the message is not meant for the user
        } else {
          setExtractedMessage(extractedMsg); // Set the extracted message if it is meant for the user
          setSender(senderID)
        }
      } else {
        alert("No hidden message found.");
      }
    };
  };

  useEffect(() => {
    console.log("User:", user);
    console.log("Sender:", sender);
    console.log("Receiver:", receiver);
    console.log("Extracted Message:", extractedMessage);
  }, [user, sender, receiver, extractedMessage]);

  return (
    <>
      <div className="container">
        <div className="select">
          <input
            type="file"
            onChange={handleImageUpload}
            className="input_file"
          />
          <button onClick={() => extractMessage(24)} disabled={!fileUploaded}>
            Extract Message
          </button>
        </div>
        <canvas ref={imageCanvas2Ref} style={{ display: "none" }}></canvas>
        <div className="result">
          <p>Hidden Image:</p>
          {image && <img src={image} alt="Uploaded" width={350} height={200} />}

          <textarea
            className="extracted-item"
            value={extractedMessage}
            readOnly
            placeholder="Extracted message will appear here"
          />
          <textarea
            className="Sent-by"
            value={sendername}
            readOnly
            placeholder="The message is sent by the sender"
          />
        </div>
      </div>

      {isOpen && (
        <Modal open={isOpen} onclose={() => setIsOpen(false)}>
          Alert: This message is not meant for you!!
        </Modal>
      )}
    </>
  );
}
