import React from "react";
import "./CSS/about.css";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom"; // Correct import for navigation
export default function About() {
  
  const navigate = useNavigate();


  const stagpage=()=>{
    navigate("/stagt");
  }
  const Knowmore=()=>{
    window.open("https://www.youtube.com/watch?v=TWEXCYQKyDc&list=RDQMjD5qK2DNGUk&start_radio=1", '_blank').focus();
  }

  const documentation=()=>{
    window.open("https://github.com/Amessaa/Stegno", '_blank').focus();
  }



  return (
    <>
       <div className="sectionab">
        <div className="Contt" >
          <Fade direction="left"  triggerOnce="true" duration="1500" >
            <div className="content-sectionab">
                <div className="titleab">
                    <h1> Steganography and Its History</h1>
                </div>
                <div className="contentab">
                    <h3></h3>
                    <p>Steganography is the secret agent of the information world, hiding data within messages or objects so cleverly you'd never notice. The term comes from the Greek "steganos" (covered) and "graphein" (writing). Imagine it as invisible ink, but much cooler. This technique dates back to 440 BC when Herodotus wrote about hidden messages in wax tablets. Over the years, methods have evolved from invisible ink and microdots to today’s digital techniques, all designed to keep information hidden in plain sight. </p>
                    <div className="buttonab">
                     
                    </div>
                </div>
            </div>
            </Fade>
            <Fade direction="right"  triggerOnce="true" duration="1500">
            <div className="image-sectionab margincorrection">
                <img src="../images/history.webp"  style={{ "marginop": "0px"}} / >
            </div>
            </Fade>
        </div>

      </div>


      {/* -------------------------------------------- */}

      <div className="sectionab">
        <div className="Contt" >
          <Fade direction="right"  triggerOnce="true" duration="1500" >
            <div className="content-section-mid">
                <div className="titleab">
                    <h1>Image Steganography</h1>
                </div>
                <div className="contentab">
                    <h3></h3>
                    <p>As the name suggests, Image Steganography refers to the process of hiding data within an image file. The image selected for this purpose is called the cover image and the image obtained after steganography is called the stego image.</p>
                    <div className="buttonab">
                    <button onClick={Knowmore} type="button" class="btn btn-dark btn-lg">Know more</button>
                    </div>
                </div>
            </div>
            </Fade>
            <Fade direction="left"  triggerOnce="true" duration="1500">
            <div className="image-sectionab">
                <img src="../images/imagestag.jpeg" style={{ "margin-top": "0px"}}/>
            </div>
            </Fade>
        </div>

      </div>

      {/* ------------------------------------------------------ */}


      <div className="sectionab">
        <div className="Contt" >
          <Fade direction="left"  triggerOnce="true" duration="1500" >
            <div className="content-sectionab">
                <div className="titleab">
                    <h1>What we exactly doing</h1>
                </div>
                <div className="contentab">
                    <h3></h3>
                    <p>In our project, we've given the traditional LSB method a makeover by tweaking the last two bits of each image pixel channel to hide data. This means each pixel can hold a tiny piece of the hidden message, like a digital puzzle, with one character per pixel. By adjusting the least significant bits, we sneak in data without ruining the image's good looks. This technique strikes a perfect balance between data capacity and image fidelity, keeping the hidden data undetectable under casual inspection. Our project is like a spy thriller, showing just how effective this method is for secret communication.</p>
                    <div className="buttonab">
                    <button onClick={stagpage} type="button" class="btn btn-primary btn-lg me-1">Lets Try This!</button>
                    <button onClick={documentation} type="button" class="btn btn-primary btn-lg me-1">Documentaion</button>
                    </div>
                </div>
            </div>
            </Fade>
            <Fade direction="right"  triggerOnce="true" duration="1500">
            <div className="image-sectionab margincorrection">
                <img src="../images/secuirty_badge.jpg" style={{ "margin-top": "0px"}}/>
            </div>
            </Fade>
        </div>

      </div>

    </>
  );
}
