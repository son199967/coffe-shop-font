import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../../constants/apiContants';
import axios from "axios";
import Select from 'react-select';
class OrderCount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            sdtList: '',
            khachHang: {
                id: null,
                tenKh: "",
                email: "",
                sdt: "",
                diemTL: ""
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
                phone: ""
            },
            sanPhamLoai: [{
                id: "",
                hinhAnh: "",
                tenSanPham: "",
                gia: null,
                loai: null,
                mota: '',
                hsDiscount: ''
            }],
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
                    mota: ""
                }
            },
            hoaDon: {
                id: 0,
                soNguoi: 1,
                time: null,
                tongTien: null,
                giamGia: null,
                chiPhiKhac: null,
                hoaDonChiTiet: [{
                    id: null,
                    mota: "",
                    soLuong: null,
                    sanPham: {
                        id: null,
                        hinhAnh: "",
                        tenSanPham: "",
                        gia: null,
                        loai: "",
                        mota: ""
                    }
                }]

            }
        }


    }

    redirectToLoginHome = () => {
        this.props.history.push('/admin/login');
    }

    componentDidMount() {
        if (localStorage.getItem(ACCESS_TOKEN_NAME) === "null" || localStorage.getItem(ACCESS_TOKEN_NAME) === null || localStorage.getItem(ACCESS_TOKEN_NAME) === undefined || localStorage.getItem(ACCESS_TOKEN_NAME) === "undefined") {
            alert("Đăng Nhập trước khi Login")
            this.redirectToLoginHome();
        } else {
            this.callAPI()
        }
        localStorage.getItem(ACCESS_TOKEN_NAME)
    }
    callAPI = async () => {
        console.log("aaa" + this.state.email + "bbb" + this.state.password);
        const user = await axios.get(API_BASE_URL + '/infoUser', {
            headers: { authorization: localStorage.getItem(ACCESS_TOKEN_NAME) }
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
        const loaiSp = await axios.get(API_BASE_URL + '/sanpham/getAllLoai')
            .then(function (response) {
                if (response.status === 200) {
                    return response.data
                }
            })
        const sanPhamLoai = await axios.get(API_BASE_URL + `/sanpham/getSanPhamLoai?loai=${this.state.loaiClick}`)
            .then(function (response) {
                if (response.status === 200) {
                    return response.data

                }
            })
        console.log("userxx", user);
        this.setState({ user, loaiSp, sanPhamLoai })
    }
    getHoaDonNotPaymnetByKH = async (sdt) => {
        const hoaDon = await axios.get(API_BASE_URL + '/getHoaDonSdt?sdtNear=' + sdt, {
            headers: { authorization: localStorage.getItem(ACCESS_TOKEN_NAME) }
        }).then(function (response) {
            console.log("user1", response);
            if (response.status === 200) {
                return response.data

            }
        })
        console.log("userxx", hoaDon);

        this.setState({ hoaDon })

    }
    callAPISP = async () => {
        const sanPhamLoai = await axios.get(API_BASE_URL + `/sanpham/getSanPhamLoai?loai=${this.state.loaiClick}`)
            .then(function (response) {
                if (response.status === 200) {
                    return response.data
                }
            })
        this.setState({ sanPhamLoai })
    }
    handleChangeObjKH = (e, name) => {
        const { khachHang } = this.state
        this.setState({
            khachHang: {
                ...khachHang,
                [name]: e.target.value
            }
        });
    }
    findSdtKhachHang = async () => {
        const khachHang = await axios.get(API_BASE_URL + `/findKhachHang?sdt=${this.state.khachHang.sdt}`)
            .then(function (response) {
                if (response.status === 200) {
                    return response.data
                }
            })
        this.setState({ khachHang })
        this.getHoaDonNotPaymnetByKH(khachHang.sdt)

    }
    addCustomer = async () => {
        const khachHang = await axios.post(API_BASE_URL + '/addKhachHang', this.state.khachHang, {
            headers: { Authorization: localStorage.getItem(ACCESS_TOKEN_NAME) }
        }).then(function (response) {
            if (response.status === 200) {
                alert("Thêm khách hàng thành công")
                return response.data
            } else {
                alert("Có lỗi xảy ra")
            }
        })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({ khachHang })
       await this.getHoaDonNotPaymnetByKH(khachHang.sdt)
    }
    updateState = (loai) => {
        this.setState({ loaiClick: loai })
        this.callAPISP()
    }
    updateStateSpCt = (s) => {
        const dataSp = s
        console.log("ssss", dataSp)
        const { hoaDonChiTiet } = this.state
        this.setState({
            hoaDonChiTiet: {
                ...hoaDonChiTiet,
                sanPham: dataSp
            }
        });
    }
    redirectToOrder = () => {
        this.props.history.push('/admin/order');
    }
    
    deleteSpToCart =async(idHd,idHdct)=>{
        const hoaDon = await axios.delete(API_BASE_URL + `/deleteSpInHdct?idHd=${idHd}&idCt=${idHdct}`, {
            headers: { Authorization: localStorage.getItem(ACCESS_TOKEN_NAME) }
        }).then(function (response) {
            if (response.status === 200) {
                console.log("hoadon",response.data)
               return response.data;
            } 
        })
       this.setState({hoaDon});
    }
    thanhToanDon =async()=>{
        const hoaDon = await axios.get(API_BASE_URL + `/thanhtoanDon?id=${this.state.hoaDon.id}`, {
        }).then(function (response) {
            if (response.status === 200) {
                console.log("hoadon",response.data)
                alert("Hoá đơn thanh toán thành công ")
               return response.data;
            } 
        })
     this.componentDidMount();
    }
    addSpToCartIteim = async (s) => {
        console.log(this.state.khachHang)
        if (this.state.khachHang === undefined) {
            alert("Chưa thêm khách hàng")
            return
        }

        await this.updateStateSpCt(s)
        console.log("logss1", this.state.hoaDonChiTiet)
        console.log("logss", this.state.hoaDon.id)
        console.log("logss", this.state.khachHang.sdt)
        const id = this.state.hoaDon.id;
        const phone = this.state.khachHang.sdt;
        let url = API_BASE_URL + '/addSpHoaDon?id=' + id + "&phoneCustomer=" + phone;
        if (id === undefined) url = API_BASE_URL + `/addSpHoaDon?phoneCustomer=${phone}`;

        const hoaDon = await axios.post(url, this.state.hoaDonChiTiet, {
            headers: { Authorization: localStorage.getItem(ACCESS_TOKEN_NAME) }
        }).then(function (response) {
            console.log("logss", response)
            if (response.status === 200) {
                return response.data;
            }
        })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({ hoaDon })

    }

    render() {
        console.log("kh",this.state.khachHang)
        console.log("hd",this.state.hoaDon)
        const loaiSp = this.state.loaiSp.map((s) =>
            <div className="col-2">
                <button type="button" class="btn btn-warning" onClick={() => this.updateState(s)}>{s}</button>
            </div>
        )
        const sanPhamLoai = this.state.sanPhamLoai.map((s) =>
            <div class="col-md-4  mt-4 ">
                <div class="thumbnail border border-primary border rounded p-4 bg-warning">
                    <a href="#">
                        <img src={s.hinhAnh} alt="Lights" style={{ width: "150px",height: "150px" }} />
                    </a>
                    <div class="caption " style={{ width: "150px",height: "80px" }}>
                        <h4 className="m-2" >{s.tenSanPham}</h4>
                    </div>
                    <div>
                        <input type="button" class="btn btn-primary" onClick={() => this.addSpToCartIteim(s)} value="Add To Cart" />
                    </div>
                </div>
            </div>
        )

        let spOrder = null;
        if (this.state.hoaDon.hoaDonChiTiet!==undefined) {
            if(this.state.hoaDon.hoaDonChiTiet[0].id !== "null"){
            spOrder = this.state.hoaDon.hoaDonChiTiet.map((s) =>
                <div className="row m-2">
                    <div className="col-2">
                        <a href="#">
                            <img src={s.sanPham.hinhAnh} style={{ "width": "100%" }} />
                        </a>
                    </div>
                    <div className="col-4">
                        <p className="m-2"><i>{s.sanPham.tenSanPham}</i></p>
                    </div>
                    <div className="col-3">
                    <input type="number" style={{ "width": "100%" }}  min="1" value={s.soLuong} />
                    </div>
                    <div className="col-2">
                    <button class="btn btn-info btn-sm"><i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onClick={()=>this.deleteSpToCart(this.state.hoaDon.id,s.id)}><i class="fa fa-trash-o"></i>
                    </button>
                    </div>
                
                </div>
            )
            }
        }
        return (

            <div className="row mt-5 mb-5" style={{ "font-size": "15px" }}>
                <div className="col-7 border">
                
                    <div className="row">
                        {loaiSp}
                    </div>
                    <div className="row mt-5">
                        {sanPhamLoai}
                    </div>
                </div>
                <div className="col-4 border ml-4">
                
                    <form className="form-row">
                        <div class="form-group col-lg-12">
                            <label for="inputAddress">Tên Khách Hàng</label>
                            <input type="text" class="form-control" value={this.state.khachHang.tenKh} onChange={(e) => this.handleChangeObjKH(e, "tenKh")} placeholder="Tên Khách" />
                        </div>
                        <div class="form-group col-lg-12">
                            <label for="inputAddress">Email</label>
                            <input type="text" class="form-control" value={this.state.khachHang.email} onChange={(e) => this.handleChangeObjKH(e, "email")} placeholder="Email" />
                        </div>
                        <div class="form-group col-lg-8">
                            <form class="form-inline">
                                <label for="inputAddress">Số điện thoại</label>
                                <input type="number" className="form-control col-8" value={this.state.khachHang.sdt} onChange={(e) => this.handleChangeObjKH(e, "sdt")} placeholder="Phone" />
                                <input type="button" className="p-1 ml-1 btn-secondary" value="Search" onClick={() => this.findSdtKhachHang()} />
                            </form>
                        </div>
                        <div className="form-group col-lg-8">
                            <input type="button" class="btn btn-primary" value="Add Customer" onClick={() => this.addCustomer()} />
                        </div>

                    </form>
                    <div className="row">
                        {spOrder}
                    </div>
                    <div>
                  <h4>Total:{this.state.hoaDon.tongTien}VND</h4>
                    </div>
                    <div>
                    <input type="button" class="btn btn-primary" value="ThanhToanDon" onClick={() => this.thanhToanDon()} />

                    </div>


                </div>
            </div>
        )
    }
}
export default withRouter(OrderCount);