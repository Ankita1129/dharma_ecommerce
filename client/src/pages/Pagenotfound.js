import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout title={"Page not found"}>
      <div className="pnf mt-5 mb-0">
        <h1 className="pnf-title my-3">404</h1>
        <h2 className="pnf-heading">Page Not Found!</h2>
        <Link to="https://dharma-1.onrender.com/" className="btn btn-dark mt-4 px-4" >
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
