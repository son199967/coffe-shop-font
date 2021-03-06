import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../../constants/apiContants";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styled, { css } from "styled-components";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      sdtList: "",
      khachHang: {
        id: null,
        tenKh: "",
        email: "",
        sdt: "",
        diemTL: "",
      },

      loaiSp: [],
      loaiClick: "Cà Phê",
      user: {
        id: null,
        username: "",
        password: "",
        email: "",
        fistName: "",
        lastName: "",
        address: "",
        identification: "",
        province: "",
        district: "",
        phone: "",
      },
      sanPhamLoai: [
        {
          id: "",
          hinhAnh: "",
          tenSanPham: "",
          gia: null,
          loai: null,
          mota: "",
          hsDiscount: "",
        },
      ],
      hoaDonChiTiet: {
        id: 0,
        mota: "",
        soLuong: null,
        sanPham: {
          id: null,
          hinhAnh: "",
          tenSanPham: "",
          gia: null,
          loai: "",
          mota: "",
        },
      },
      hoaDon: {
        id: 0,
        soNguoi: 1,
        time: null,
        tongTien: null,
        giamGia: null,
        chiPhiKhac: null,
        hoaDonChiTiet: [
          {
            id: null,
            mota: "",
            soLuong: null,
            sanPham: {
              id: null,
              hinhAnh: "",
              tenSanPham: "",
              gia: null,
              loai: "",
              mota: "",
            },
          },
        ],
      },
    };
  }

  redirectToLoginHome = () => {
    this.props.history.push("/admin/login");
  };

  componentDidMount() {
    this.callAPI();
  }
  callAPI = async () => {
    console.log("aaa" + this.state.email + "bbb" + this.state.password);
    const user = await axios
      .get(API_BASE_URL + "/infoUser", {
        headers: { authorization: localStorage.getItem(ACCESS_TOKEN_NAME) },
      })
      .then(function (response) {
        if (response.status === 200) {
          return response.data;
        } else {
          alert("Đã có lỗi xảy ra");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    const loaiSp = await axios
      .get(API_BASE_URL + "/sanpham/getAllLoai")
      .then(function (response) {
        if (response.status === 200) {
          return response.data;
        }
      });
    const sanPhamLoai = await axios
      .get(
        API_BASE_URL + `/sanpham/getSanPhamLoai?loai=${this.state.loaiClick}`
      )
      .then(function (response) {
        if (response.status === 200) {
          return response.data;
        }
      });
    console.log("userxx", user);
    this.setState({ user, loaiSp, sanPhamLoai });
  };
  getHoaDonNotPaymnetByKH = async (sdt) => {
    const hoaDon = await axios
      .get(API_BASE_URL + "/getHoaDonSdt?sdtNear=" + sdt, {
        headers: { authorization: localStorage.getItem(ACCESS_TOKEN_NAME) },
      })
      .then(function (response) {
        console.log("user1", response);
        if (response.status === 200) {
          return response.data;
        }
      });
    console.log("userxx", hoaDon);

    this.setState({ hoaDon });
  };
  callAPISP = async () => {
    const sanPhamLoai = await axios
      .get(
        API_BASE_URL + `/sanpham/getSanPhamLoai?loai=${this.state.loaiClick}`
      )
      .then(function (response) {
        if (response.status === 200) {
          return response.data;
        }
      });
    this.setState({ sanPhamLoai });
  };
  handleChangeObjKH = (e, name) => {
    const { khachHang } = this.state;
    this.setState({
      khachHang: {
        ...khachHang,
        [name]: e.target.value,
      },
    });
  };
  findSdtKhachHang = async () => {
    const khachHang = await axios
      .get(API_BASE_URL + `/findKhachHang?sdt=${this.state.khachHang.sdt}`)
      .then(function (response) {
        if (response.status === 200) {
          return response.data;
        }
      });
    this.setState({ khachHang });
    this.getHoaDonNotPaymnetByKH(khachHang.sdt);
  };
  addCustomer = async () => {
    const khachHang = axios
      .post(API_BASE_URL + "/addKhachHang", this.state.khachHang, {
        headers: { Authorization: localStorage.getItem(ACCESS_TOKEN_NAME) },
      })
      .then(function (response) {
        if (response.status === 200) {
          alert("Thêm khách hàng thành công");
        } else {
          alert("Có lỗi xảy ra");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ khachHang });
  };
  updateState = (loai) => {
    this.setState({ loaiClick: loai });
    this.callAPISP();
  };
  updateStateSpCt = (s) => {
    const dataSp = s;
    console.log("ssss", dataSp);
    const { hoaDonChiTiet } = this.state;
    this.setState({
      hoaDonChiTiet: {
        ...hoaDonChiTiet,
        sanPham: dataSp,
      },
    });
  };

  deleteSpToCart = async (idHd, idHdct) => {
    const hoaDon = await axios
      .delete(API_BASE_URL + `/deleteSpInHdct?idHd=${idHd}&idCt=${idHdct}`, {
        headers: { Authorization: localStorage.getItem(ACCESS_TOKEN_NAME) },
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log("hoadon", response.data);
          return response.data;
        }
      });
    this.setState({ hoaDon });
  };
  addSpToCartIteim = async (s) => {
    console.log(this.state.khachHang);
    if (this.state.khachHang === undefined) {
      alert("Chưa thêm khách hàng");
      return;
    }

    await this.updateStateSpCt(s);
    console.log("logss1", this.state.hoaDonChiTiet);
    console.log("logss", this.state.hoaDon.id);
    console.log("logss", this.state.khachHang.sdt);
    const id = this.state.hoaDon.id;
    const phone = this.state.khachHang.sdt;
    let url =
      API_BASE_URL + "/addSpHoaDon?id=" + id + "&phoneCustomer=" + phone;
    if (id === undefined)
      url = API_BASE_URL + `/addSpHoaDon?phoneCustomer=${phone}`;

    const hoaDon = await axios
      .post(url, this.state.hoaDonChiTiet, {
        headers: { Authorization: localStorage.getItem(ACCESS_TOKEN_NAME) },
      })
      .then(function (response) {
        console.log("logss", response);
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ hoaDon });
  };

  render() {
    console.log("loaiSp", this.state.hoaDon);
    const loaiSp = this.state.loaiSp.map((s) => (
      <Rect2>
        <ButtonOverlay>
          <LoremIpsum  href="#" onClick={() => this.updateState(s)}>
            {s}
          </LoremIpsum>
        </ButtonOverlay>
        {/* <a href="#" onClick={() => this.updateState(s)} ></a> */}
      </Rect2>
    ));
    const sanPhamLoai = this.state.sanPhamLoai.map(
      (s, index) => (
        <div className="tm-popular-item col-4" key={index}>
          <img
            src={s.hinhAnh}
            alt="Popular"
            style={{ width: "200px", height: "200px" }}
            className="tm-popular-item-img"
          />
          <div className="tm-popular-item-description">
            <h3
              className="tm-handwriting-font tm-popular-item-title "
              style={{ width: "100%", height: "20px" }}
            >
              {s.tenSanPham}
            </h3>
            <hr className="tm-popular-item-hr mt-5" />
            <p style={{ width: "100%", height: "40px" }}>{s.mota}</p>
            <div className="caption tm-handwriting-font">
              <h3 className="m-2">{s.gia} VND</h3>
            </div>
            <div className="order-now-container center">
              <a href="#" className="order-now-link tm-handwriting-font">
                Order Now
              </a>
            </div>
          </div>
        </div>
      )
      // <div class="col-md-5 ">
      //     <div class="thumbnail border border-primary p-4 bg-warning m-5">
      //     <a href="#">
      //             <img src={s.hinhAnh} alt="Lights" style={{ width: "150px",height: "150px" }} />
      //         </a>
      //         <div class="caption " style={{ width: "150px",height: "80px"  }}>
      //             <h3 className="m-2" style={{alignContent:"center"}}>{s.tenSanPham}</h3>
      //         </div>
      //         <div className="caption">
      //         <h5 className="m-2">{s.mota}</h5>
      //         </div>
      //         <div className="caption">
      //         <h3 className="m-2">{s.gia}VND</h3>
      //         </div>

      //     </div>
      // </div>
    );

    let spOrder = null;
    if (this.state.hoaDon.hoaDonChiTiet !== undefined) {
      if (this.state.hoaDon.hoaDonChiTiet[0].id !== "null") {
        spOrder = this.state.hoaDon.hoaDonChiTiet.map((s) => (
          <div className="row m-2">
            <div className="col-2">
              <a href="#">
                <img src={s.sanPham.hinhAnh} style={{ width: "100%" }} />
              </a>
            </div>
            <div className="col-4">
              <p className="m-2">
                <i>{s.sanPham.tenSanPham}</i>
              </p>
            </div>
          </div>
        ));
      }
    }
    return (
      <div className="container">
        <div className="row mt-5 mb-5" style={{ "font-size": "15px" }}>
          <div className="col-9 border">
            <div className="row">{sanPhamLoai}</div>
          </div>
          <div className="col-3 tm-handwriting-font">
            <Rect>
              <Catetory>Catetory</Catetory>
              <div className="row tm-handwriting-font">{loaiSp}</div>
            </Rect>
          </div>
        </div>
      </div>
    );
  }
}
const Rect = styled.div`
  padding-bottom: 20px;
  width: 462px;
  background-color: rgba(197, 144, 97, 0.85);
  border-radius: 17px;
  shadow-radius: 0px;
  flex-direction: column;
  display: flex;
  box-shadow: 3px 3px 0px 0.41px rgba(0, 0, 0, 1);
`;

const Catetory = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  font-size: 40px;
  margin-top: 13px;
  margin-left: "35%";
`;

const Rect2 = styled.div`
  width: 385px;
  height: 59px;
  background-color: rgba(230, 230, 230, 1);
  border-radius: 10px;
  flex-direction: column;
  display: flex;
  margin-top: 31px;
  margin-left: 31px;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  font-size: 30px;
  margin-top: 12px;
  margin-left: 17px;
`;
const ButtonOverlay = styled.button`
  display: block;
  background: none;
  height: 100%;
  width: 100%;
  border: none;
`;
export default withRouter(Menu);
