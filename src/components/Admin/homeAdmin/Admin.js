import { withRouter } from "react-router-dom";
import AdminHead from "./AdminHead";
import OrderCount from "./OrderCount";
import Login from "../LoginForm/Login"
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Product from "./Product";
import React, { Component } from 'react';
import QuanLyNhanVien from "./QuanLyNhanVien";
import MyAccount from "./MyAccount";
import BaoCaoDoanhThu from "./BaoCaoDoanhThu";
class Admin extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }



  render() {
    return (
      <div>
          
            <Router>
      
            <AdminHead />
            <div className="">
              <Switch>
                <Route path="/admin/order" component={OrderCount} >
                  <OrderCount />
                </Route>
                <Route path="/admin/product" component={Product} >
                  <Product />
                </Route>
                <Route path="/admin/user" component={QuanLyNhanVien} >
                  <QuanLyNhanVien />
                </Route>
                <Route path="/admin/login" component={Login} >
                  <Login />
                </Route>
                <Route path="/admin/register" component={RegistrationForm} >
                  <RegistrationForm />
                </Route>
                <Route path="/admin/account" component={MyAccount} >
                  <MyAccount />
                </Route>
                
                <Route path="/admin/doanhthu" component={BaoCaoDoanhThu} >
                  <BaoCaoDoanhThu />
                </Route>
                
              </Switch>
              </div>
             
              </Router>
           
          
        
      </div>
    )
  }
}
export default withRouter(Admin)