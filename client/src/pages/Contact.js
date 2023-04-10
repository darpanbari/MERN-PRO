import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contact.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>  
        <div className="col-md-4">
          <h1 className="bgcolor-2 p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2 fw-bold fst-italic">
            If Any query and info about product | Feel free to contact anytime | We 24X7
            Available
          </p>
          <p className="mt-3 fw-bold fst-italic">
            <BiMailSend style={{fontSize:"30px", color:"#8cb799"}}/> : www.help@babyshop.com
          </p>
          <p className="mt-3 fw-bold fst-italic">
            <BiPhoneCall style={{fontSize:"30px", color:"#8cb799"}}/> : 0123456789
          </p>
          <p className="mt-3 fw-bold fst-italic">
            <BiSupport style={{fontSize:"30px", color:"#8cb799"}}/> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
