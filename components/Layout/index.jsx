import React from "react";
import Footer from "../Footer";
import Header from "../Header";

// eslint-disable-next-line arrow-body-style
export const Layout = ({ children }) => {
  return (
    <div id="mainApplicationWrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
