import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"Categories - Dharma hardware & electronics"}>
      <div className="container" style={{ marginTop: "50px", padding:"70px" }}>
        <div className="row container">
          {categories.map((c) => (
            <div className="col-md-4 mt-3 mb-3 gx-4 gy-4" key={c._id}>
              <div className="card">
                <Link to={`https://dharma-1.onrender.com/category/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
