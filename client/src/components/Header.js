import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <Link to="/" className="header__title">
              <h1>Blog</h1>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export { Header as default };
