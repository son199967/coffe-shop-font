import React from "react";




const Header = (props) => {
  return (
    <div>
      <div className="tm-top-header">
        <div className="container">
          <div className="row">
            <div className="tm-top-header-inner">
              <div className="tm-logo-container">
                <img src="img/logo.png" alt="Logo" className="tm-site-logo" />
                <h1 className="tm-site-name tm-handwriting-font">Cafe House</h1>
              </div>
              <div className="mobile-menu-icon">
                <i className="fa fa-bars"></i>
              </div>
              <nav className="tm-nav">
                <ul>
                  <li>
                    <a href="index.html" className="active">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="today-special.html">Today Special</a>
                  </li>
                  <li>
                    <a href="/menu">Menu</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
