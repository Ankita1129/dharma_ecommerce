import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results - Dharma hardware & electronics"}>
      <div className="container py-5 my-0">
        <div className="text-center" style={{marginTop:"50px"}}>
          <h1>Search Resuts</h1>
          <h5>
            {values?.results.length < 1
              ? "No Products Found"
              : `${values?.results.length} found `}
          </h5>
          <div className="d-flex justify-content-center flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body py-3 px-0">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> ₹ {p.price}</p>
                  <button class="btn btn-warning mx-1">MORE DETAILS</button>
                  <button class="btn btn-dark mx-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
