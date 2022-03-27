import React from "react";
import Footer from "../Footer";
import Header from "../Header";

export const Layout = ({ children }) => {
  // TODO FIX THIS RETURN ISSUE
  console.log("Layout");

  return (
    <div id="mainApplicationWrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
