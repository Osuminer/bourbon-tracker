import React from "react";
import MyNavbar from "./Navbar";
import BourbonCard from "./BourbonCard";
import './App.scss'

const App = () => {
  return (
    <div className="body">
      <MyNavbar />
      <div className="container mt-5">
        <div className="row g-5 justify-content-center">
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          <div className="col-lg-4 col-xl-3 col-md-6 p-sm-3">
            <BourbonCard />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default App;
