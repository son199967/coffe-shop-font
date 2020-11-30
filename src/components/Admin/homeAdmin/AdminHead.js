import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../../constants/apiContants';
import axios from 'axios';

class AdminHead extends Component {
    constructor(props) {
        super(props);

      }
      redicrect= (e) => {
        this.props.history.push(`/admin${e}`)
      }
      redicrectQLNV = () =>{
        this.props.history.push("/admin/user")

      }
render() {

 return(
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
                  <a href="#" className="active" onClick={()=>this.redicrect("/order")}>
                    Order
                  </a>
                </li>
                <li>
                  <a href="#" onClick={()=>this.redicrect("/user")}>QuanLyNhanVien</a>
                </li>
                <li>
                  <a href="#" onClick={()=>this.redicrect("/product")}>QuanLySanPham</a>
                </li>
                <li>
                  <a href="" onClick={()=>this.redicrect("/account")}>Account</a>
                </li>
                <li>
                  <a href="contact.html">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
 )
}
}
export default withRouter(AdminHead);