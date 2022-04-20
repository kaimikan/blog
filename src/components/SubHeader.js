import React from "react";
import { Link } from "react-router-dom";

const SubHeader = () => {
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <div className="page-header__content">
            <h2 className="page-header__title">Type Your Mind Out</h2>
            <div className="page-header__actions">
              <Link to="/add" className="button">
                Add Post
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SubHeader as default };
