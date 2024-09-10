import React, { useState, useRef, useEffect } from "react";

import Modal from "../components/modalstag";
import SearchBar from "../components/search";
import "./stagt2p.css";

const Steganography = (props) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [isopen, setisopen] = useState(false);

  var user = "$$$$$$$$$$$$$$$$$$$$$$$$";
  if (props.logged_user._id) user = props.logged_user._id;
  //  console.log("user - " + user);
  const [reciever, setreciever] = useState("$$$$$$$$$$$$$$$$$$$$$$$$");
  const imageCanvasRef = useRef(null);

  useEffect(() => {
    console.log("sending_user: ", user);
    console.log("reciever: ", reciever);
  }, [user, reciever]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setFileUploaded(true);
    }
  };

  const createImageCanvas = () => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.setAttribute("crossOrigin", "");
    img.onload = () => {
      const canvas = imageCanvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data;

      const messageWithHeader = "Valid\n" + user + reciever + message;
      const binaryMessage = [];
      for (let i = 0; i < messageWithHeader.length; i++) {
        const charCode = messageWithHeader.charCodeAt(i);
        for (let j = 7; j >= 0; j--) {
          binaryMessage.push((charCode >> j) & 1);
        }
      }

      for (let i = 0; i < pixelData.length; i++) {
        pixelData[i] &= 254; // Clear the least significant bit
      }

      for (let i = 0; i < binaryMessage.length; i++) {
        pixelData[i] |= binaryMessage[i];
      }

      ctx.putImageData(imageData, 0, 0);

      // Set the download link
      const dataURL = canvas.toDataURL();
      setDownloadLink(dataURL);
    };

    setisopen(true);
  };

  const handleDownload = () => {
    if (!downloadLink) return;

    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = "steganography_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectUser = (userId) => {
    setreciever(userId);
    console.log(reciever);
  };

  return (
    <div className="body">
      <div className="container">
        <h1>Steganography Tool</h1>
        <SearchBar onSelectUser={handleSelectUser} />
        <div className="upload-section">
          <input type="file" onChange={handleImageUpload} />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message to hide"
            className="message-input"
          />
          {/* <textarea
            value={user}
            onChange={(e) => setuser(e.target.value)}
            placeholder="Enter user-id"
            className="message-input"
          /> */}

          {/* <textarea
            value={reciever}
            onChange={(e) => setreciever(e.target.value)}
            placeholder="Enter reciever's-id"
            className="message-input"
            style={{ rows: 1 }}
          /> */}

          <button onClick={createImageCanvas} disabled={!fileUploaded}>
            Hide Message
          </button>

          {isopen && (
            <Modal
              open={isopen}
              onclose={() => {
                setisopen(false);
              }}
              // navigateto={false}
            >
              Your message is now encrypted.
            </Modal>
          )}
        </div>

        <div className="up_down">
          <div className="image-section">
            {image && (
              <>
                <p>Uploaded Image:</p>
                <img src={image} alt="Uploaded" className="uploaded-image" />
              </>
            )}
          </div>

          <div className="download-section">
            <button onClick={handleDownload} disabled={!downloadLink}>
              Download Modified Image
            </button>
          </div>
        </div>
        <canvas ref={imageCanvasRef} style={{ display: "none" }}></canvas>
      </div>
    </div>
  );
};

export default Steganography;
