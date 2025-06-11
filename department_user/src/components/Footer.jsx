import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-700 text-white text-center py-4 mt-auto shadow-inner">
      <p className="text-lg font-medium tracking-wide">
        © {new Date().getFullYear()} Concurrence. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
