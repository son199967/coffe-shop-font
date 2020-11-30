import React, { Component } from 'react'
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../../constants/apiContants';
import { withRouter } from "react-router-dom";
class RegistrationForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
          password: null,
          email:null,
          confirmPassword:null,
          successMessage:null
        };
      }
   
    handleCChange = (e,name) => {
        this.setState({
            [name]:e.target.value,
        });
    }
    redirectToHome = () => {
        this.props.history.push('/admin/order');
    }

    sendDetailsToServer = () => {
        console.log("legin"+this.state.email.length);
       if(this.state.email.length && this.state.password.length) {
           const payload={
               "email":this.state.email,
               "password":this.state.password,
           }
           var self=this;
           axios.post(API_BASE_URL+'/register', payload)
               .then(function (response) {
                   if(response.status === 200){
                       alert("Dang ki thanh cong");
                       console.log("loggg",response.data.token)
                       localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                       console.log("token :"+response.data.token);
                       self.props.history.push('/admin/order')
                   } else{
                       alert("Dang ki That bai");
                       console.log("error");
                   }
               })
               .catch(function (error) {
                   console.log(error);
               });    
       } else {
           this.props.showError('Please enter valid username and password')    
       }
       
   }
     
     redirectToLogin = () => {
       this.props.history.push('/admin/login'); 
    }
      handleSubmitClickRe= () => {
          console.log("aaa"+this.state.password+"bb"+this.state.confirmPassword);
        if(this.state.password === this.state.confirmPassword) {
            this.sendDetailsToServer()    ;
        } else {
            console.log("Passwords do not match");
        }
    }
    render(){
    return(
        <div className="container mt-5">
            <div className="col-lg-4">

            </div>
        <div className="card col-12 col-lg-4 login-card mt-5 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={this.state.email}
                       onChange={e => this.handleCChange(e,"email")}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={this.state.password}
                        onChange={e => this.handleCChange(e,"password")} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={this.state.confirmPassword}
                        onChange={e => this.handleCChange(e,"confirmPassword")} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={()=>this.handleSubmitClickRe()}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
                {this.state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => this.redirectToLogin()}>Login here</span> 
            </div>
            
        </div>
        </div>
    )
    }
}

export default withRouter(RegistrationForm);