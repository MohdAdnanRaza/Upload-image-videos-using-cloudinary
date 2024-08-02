import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Media Upload App</h1>
      </div>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Upload
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/videos" className="nav-link">
              Listing
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
