/* eslint-disable react/prop-types */
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout"> 
      <Navbar />
      <div  className="container py-5">
        <div className="mt-3">
        {children}
        </div>
        
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
