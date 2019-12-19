import React, {Component} from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import 'font-awesome/css/font-awesome.min.css';
import { ReactComponent as Logo} from './github-logo.svg';
 

const Footer = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <div className="footer-copyright text-center py-3">
        <MDBContainer className="footer" fluid >
          &copy; {new Date().getFullYear()} Copyright : Ravenous <a href="https://github.com/rajat2502/Ravenous"><Logo className="logo"></Logo></a> 
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;