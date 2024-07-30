import React from "react";
import "../styles.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer">
        <p className="footer-text">
          Copyright &copy; {currentYear} Movieduck. All rights are reserved
        </p>
      </footer>
    </>
  );
}

export default Footer;
