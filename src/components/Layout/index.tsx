import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar";
import AuthModal from "../Modal/Auth";

const Layout: React.FC = ({ children }) => {
  // useAuth(); // will implement later at end of tutorial

  const styleOne = {
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "1500px",
  };

  const styleTwo = {
    display: "flex",
    zIndex: "1",
    marginLeft: "5px",
    marginRight: "5px",
  };

  const styleThree = {
    width: '100%',
    zIndex: '-1',
    marginBottom: '-150px',
  };

  return (
    <>
      <Navbar />
      {children}
{/*
      <div style={styleOne}>
        <div style = {styleTwo}>
          <img
            style = {styleThree}
            src="images/battle_brothers_logo_1.png"
            alt=""
          />
        </div>
      </div> */}
    </>
  );
};

export default Layout;
