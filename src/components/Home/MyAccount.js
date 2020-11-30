import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        email: "",
        fistName: "",
        lastName: "",
        address: "",
        identification: "",
        province: "",
        district: "",
        phone: ""
      }
    }
  }
  handleChange = (e, name) => {
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        [name]: e.target.value
      }
    });
  }

  callAPIUpdateInfo = (e) => {
    console.log("aaa", this.state.user);
    const user = axios.put(API_BASE_URL + '/updateUserInfo', this.state.user, {
      headers: {
        Authorization: localStorage.getItem(ACCESS_TOKEN_NAME)
      }
    }).then(function (response) {
      if (response.status === 200) {
        alert("Cap nhap thanh cong")
      }
      else if (response.code === 401) {
      }
    })
      .catch(function (error) {
        console.log(error);
      });

  }
  // componentWillUnmount(){
  //   this.callAPI();
  // }
  componentDidMount() {
    this.callAPI();
  }
  callAPI = async () => {
    console.log("aaa" + this.state.email + "bbb" + this.state.password);
    const user = await axios.get(API_BASE_URL + '/infoUser', {
      headers: {
        authorization: localStorage.getItem(ACCESS_TOKEN_NAME)
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          return response.data
        }
        else {
          alert("Đã có lỗi xảy ra");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("userxx", user);
    this.setState({ user })
  }


  render() {

    return (
      <body>
        <div class="main-content">
          <div class="container mt-7">
            <h2 class="mb-5">My Account</h2>
            <div class="row">
              <div class="col-xl-8 m-auto order-xl-1">
                <div class="card  shadow">
                  <div class="card-header bg-white border-0">
                    <div class="row align-items-center p-5">
                      <div class="col-8">
                        <h3 class="mb-0">My account</h3>
                      </div>
                      <div class="col-4 text-right">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={this.callAPIUpdateInfo}
                        >UPDATE</button>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <form>
                      <h6 class="heading-small text-muted mb-4">User information</h6>
                      <div class="pl-lg-4">
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="form-group focused">
                              <label class="form-control-label" for="input-username">Username</label>
                              <input type="text" id="input-username" class="form-control form-control-alternative" placeholder="Username" value={this.state.user.username} onChange={(e) => this.handleChange(e, "username")} />
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="form-group">
                              <label class="form-control-label" for="input-email">Email address</label>
                              <input type="email" id="input-email" class="form-control form-control-alternative" placeholder="jesse@example.com" value={this.state.user.email} disabled />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="form-group focused">
                              <label class="form-control-label" for="input-first-name">First name</label>
                              <input type="text" id="input-first-name" class="form-control form-control-alternative" placeholder="First name" value="Lucky" value={this.state.user.fistName} onChange={(e) => this.handleChange(e, "fistName")} />
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="form-group focused">
                              <label class="form-control-label" for="input-last-name">Last name</label>
                              <input type="text" id="input-last-name" class="form-control form-control-alternative" placeholder="Last name" value="Jesse" value={this.state.user.lastName} onChange={(e) => this.handleChange(e, "lastName")} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="my-4"></hr>

                      <h6 class="heading-small text-muted mb-4">Contact information</h6>
                      <div class="pl-lg-4">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group focused">
                              <label class="form-control-label" for="input-address">Address</label>
                              <input id="input-address" class="form-control form-control-alternative" placeholder="Home Address" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text" value={this.state.user.address} onChange={(e) => this.handleChange(e, "address")} />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-4">
                            <div class="form-group focused">
                              <label class="form-control-label" for="input-city">City</label>
                              <input type="text" id="input-city" class="form-control form-control-alternative" placeholder="City" value="New York" value={this.state.user.province} onChange={(e) => this.handleChange(e, "province")} />
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="form-group focused">
                              <label class="form-control-label" for="input-country">Phone Number</label>
                              <input type="number" id="input-country" class="form-control form-control-alternative" placeholder="Country" value="United States" value={this.state.user.phone} onChange={(e) => this.handleChange(e, "phone")} />
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="form-group">
                              <label class="form-control-label" for="input-country">Số Chứng Minh Thư</label>
                              <input type="number" id="input-postal-code" class="form-control form-control-alternative" placeholder="Identification  Code" value={this.state.user.identification} onChange={(e) => this.handleChange(e, "identification")} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="my-4" ></hr>
                      <h6 class="heading-small text-muted mb-4">About me</h6>
                      <div class="pl-lg-4">
                        <div class="form-group focused">
                          <label>About Me</label>
                          <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="footer">
          <div class="row align-items-center justify-content-xl-between">
            <div class="col-xl-6 m-auto text-center">
              <div class="copyright">
                <p>Made with <a href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">Argon Dashboard</a> by Creative Tim</p>
              </div>
            </div>
          </div>
        </footer>
      </body>

    )
  }
}

export default withRouter(MyAccount);