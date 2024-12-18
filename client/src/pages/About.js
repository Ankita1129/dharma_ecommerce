import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Dharma hardware & electronics"}>
      <div style={{marginTop:"60px"}}></div>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "450px", padding:"70px", marginLeft:"100px"}}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Welcome to <b>Dharma hardware and electronics</b>, your trusted source for high-quality hardware and electronic components. With a strong foundation as a brick-and-mortar store, we have expanded our reach online to provide you with even more convenience and accessibility. <br></br> <br></br>
          Founded in 2010, we started as a local hardware and electronics shop at <b>Nandanwan, Nagpur</b>. Over the years, our commitment to quality, expertise, and customer satisfaction allowed us to grow and become a recognized name in the industry.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
