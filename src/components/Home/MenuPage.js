import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Menu extends Component {

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
            this.callAPI()
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
        const khachHang = axios.post(API_BASE_URL + '/addKhachHang', this.state.khachHang, {
            headers: { Authorization: localStorage.getItem(ACCESS_TOKEN_NAME) }
        }).then(function (response) {
            if (response.status === 200) {
                alert("Thêm khách hàng thành công")
            } else {
                alert("Có lỗi xảy ra")
            }
        })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({ khachHang })
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
        console.log("loaiSp",this.state.hoaDon)
        const loaiSp = this.state.loaiSp.map((s) =>
            <div className="col-12 mt-5">
                <a href="#" onClick={() => this.updateState(s)} >###{s}</a>
            </div>
        )
        const sanPhamLoai = this.state.sanPhamLoai.map((s) =>
            <div class="col-md-5 ">
                <div class="thumbnail border border-primary p-4 bg-warning m-5">
                <a href="#">
                        <img src={s.hinhAnh} alt="Lights" style={{ width: "150px",height: "150px" }} />
                    </a>
                    <div class="caption " style={{ width: "150px",height: "80px"  }}>
                        <h3 className="m-2" style={{alignContent:"center"}}>{s.tenSanPham}</h3>
                    </div>
                    <div className="caption">
                    <h5 className="m-2">{s.mota}</h5>
                    </div>
                    <div className="caption">
                    <h3 className="m-2">{s.gia}VND</h3>
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
                </div>
            )
            }
        }
        return (
            <div className="container">

           
            <div className="row mt-5 mb-5" style={{ "font-size": "15px" }}>
            <div className="col-9 border">
                <div className="row">
                        {sanPhamLoai}
                </div>
                </div>
                <div className="col-3 border">
                    <h1>Category</h1>
                    <div className="row">
                        {loaiSp}
                    </div>
                   
                </div>
                
            </div>
            </div>
        )
    }
}
export default withRouter(Menu);