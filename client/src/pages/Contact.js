import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us - Dharma hardware & electronics"}>
      <div style={{marginTop:"60px"}}></div>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="aboutus"
            style={{ width: "450px", padding:"70px", marginLeft:"100px"}}
          />
        </div>
        <div className="col-md-4">
          <h3 className=" p-2 text-dark text-center">CONTACT US</h3>
          
          
          <p className="mt-3">
          <b>PHONE NO </b>: +91 9822536671
          </p>
          <p className="mt-3">
          <b>ADDRESS </b>: Dharma Hardware and Electronics, Ganesh Nagar, Nandanwan, Nagpur - 440024.
          </p>
          <p className="mt-3">
            <b>OPEN DAYS </b>: Monday to Saturday
          </p>
          <p className="mt-3">
          <b>TIMINGS </b>: 8 AM to 10 PM
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
