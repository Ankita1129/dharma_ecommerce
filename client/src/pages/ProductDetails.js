import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useCart } from "../context/cart";

import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      //console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <Layout>
      <div>
        <div className="row product-details ">
          <div className="col-md-5 text-center  align-self-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
            />
          </div>
          <div className="col-md-7 product-details-info">
            <h3 className="text-center m-0 p-0">PRODUCT DETAILS</h3>
            <hr />
            <h5 className="my-3">Name : {product.name}</h5>
            <h5 className="my-3">Description : {product.description}</h5>
            <h5 className="my-3">
              Price : ₹{product?.price?.toLocaleString("en-US")}
            </h5>
            <h5 className="my-3">Category : {product?.category?.name}</h5>
            <button
              class="btn btn-dark my-3"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item Added to cart");
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <hr />
        <div className="row mx-4 pb-5 pt-1 similar-products">
          <h5 className="mx-4 py-2">SIMILAR PRODUCTS</h5>
          {relatedProducts.length < 1 && (
            <p className="text-center sp">No similar products found :(</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top mddd"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      ₹{p.price.toLocaleString("en-US")}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-warning ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      MORE DETAILS
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
