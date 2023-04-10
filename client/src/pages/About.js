import React from "react";
import "../styles/About.css";
import { GiPriceTag, GiShakingHands } from 'react-icons/gi';
import {AiOutlineDeliveredProcedure} from 'react-icons/ai';
import {MdSentimentSatisfiedAlt , MdAssignmentReturn} from 'react-icons/md';
import {BsHandThumbsUpFill} from 'react-icons/bs';

const About = () => {
   
  return (
    <> 
    
    <div>
    <div
      style={{
        width: "90%",
        margin: "0px auto",
      }}
    >
      <div className="about__page">
        <>
      <div className="row about-us mt-5" style={{height:"65%"}}>
        <div className="col-md-6 col-sm-6 d-flex justify-content-center">
          <img
            src="/images/banner2.jpg"
            alt="contactus"
            style={{ width: "75%" }}
          />
        </div>
        <div className="col-md-6 col-sm-6">
          <p className="text-justify mt-2 fw-bold fst-italic text-center">
          <span className="fs-4">Babyshop</span> was founded in 2006 by Linn and Marcus Tagesson with a vision of building the best online store in the Nordics for children's clothing. Our goal is to inspire our customers by offering an exclusive shopping experience and excellent customer service with the best mixture of well-known and high-quality brands. Our product assortment is comprised of baby and children's clothes, shoes, toys, strollers, car seats, maternity clothes, accessories and much more for ages 0-10.
          You can find Babyshop online, on your mobile or in our flagship store in Drottninggatan 82, Stockholm.
          </p>
        </div>
      </div>
    </>

        {/* 2nd verse */}
        <div className="main-container">
          <div className="heading">
            <h2 className="mt-5">What We Provide?</h2>
          </div>
          <div className="row flex justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-12 my-3">
                <div className="card-box">
        
                <div className="icons-style">
                  <GiPriceTag/>
                </div>
                
              <h4 className="text-center">Best Prices & Offers</h4>
              <p>
                There are many variations of passages of Lorem Ipsum
                available, but the majority have suffered alteration in some
                form
              </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 my-3">
                <div className="card-box">
                <div className="icons-style">
                <GiShakingHands/>
                </div>
              <h4 className="text-center">Best For Trust & Quality</h4>
              <p>
                There are many variations of passages of Lorem Ipsum
                available, but the majority have suffered alteration in some
                form
              </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 my-3">
                <div className="card-box">
                <div className="icons-style">
                <AiOutlineDeliveredProcedure/>
                </div>
              <h4 className="text-center">Fast Delivery System</h4>
              <p>
                There are many variations of passages of Lorem Ipsum
                available, but the majority have suffered alteration in some
                form
              </p>
              </div>
            </div>


            <div className="col-lg-4 col-md-6 col-sm-12 my-3">
                <div className="card-box">
                <div className="icons-style">
                <MdAssignmentReturn/>
                </div>
              <h4 className="text-center">Easy Returns Service</h4>
              <p>
                There are many variations of passages of Lorem Ipsum
                available, but the majority have suffered alteration in some
                form
              </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 my-3">
                <div className="card-box">
                <div className="icons-style">
                <MdSentimentSatisfiedAlt/>
                </div>
              <h4 className="text-center">100% satisfication</h4>
              <p>
                There are many variations of passages of Lorem Ipsum
                available, but the majority have suffered alteration in some
                form
              </p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 col-sm-12 my-3">
                <div className="card-box">
                <div className="icons-style">
                <BsHandThumbsUpFill/>
                </div>
              <h4 className="text-center">Great Daily Deal</h4>
              <p>
                There are many variations of passages of Lorem Ipsum
                available, but the majority have suffered alteration in some
                form
              </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
};

export default About;
