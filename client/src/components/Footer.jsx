import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800/50 py-6 px-6 mt-auto">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} DocuMind AI. All rights reserved. | Made by Taha
        </p>
      </div>
    </footer>
  );
};

export default Footer;