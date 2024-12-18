import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import "../../styles/Layout.css"
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main >
        <Toaster />

        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Dharma hardware & electronics",
  description: "Online site for shopping hardware and electronics",
  keywords: "hardware,electronics,shop,nagpur",
  author: "ankitasingh",
};

export default Layout;
