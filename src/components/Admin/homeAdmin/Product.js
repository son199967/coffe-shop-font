import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../../constants/apiContants';
class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sanPhamList: [{
                id: "",
                hinhAnh: "",
                tenSanPham: "",
                gia: null,
                loai: null,
                mota: '',
                hsDiscount: ''
            }
            ],
            sanPham: {
                hinhAnh: "",
                tenSanPham: "",
                gia: null,
                loai: null,
                mota: '',
                hsDiscount: '',
            }
        }
    }

    callApiAddSanPham = () => {
        console.log("demo", this.state.sanPham)
        axios.post(API_BASE_URL + '/sanpham/createNewSanPham/', this.state.sanPham, {
            headers: {
                Authorization: localStorage.getItem(ACCESS_TOKEN_NAME)
            }
        })
            .then(function (response) {
                if (response.status === 200) {
                    alert("Thêm Thành công sản phẩm giỏ hàng")
                } else {
                    alert("Có lỗi xảy ra")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    callApiGetAllSanPham = async () => {
        console.log("demo", this.state.sanPham)
        const sanPhamList = await axios.get(API_BASE_URL + '/sanpham/getAllSanPham')
            .then(function (response) {
                if (response.status === 200) {

                    return response.data;
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({ sanPhamList: sanPhamList })
    }

    handleChangeObj = (e, name) => {
        const { sanPham } = this.state
        this.setState({
            sanPham: {
                ...sanPham,
                [name]: e.target.value
            }
        });
    }
    handleChange = (e, name) => {
        this.setState({
            [name]: e.target.value,
        });
    }
    componentDidMount() {
        this.callApiGetAllSanPham();
    }
    render() {
        const sanPhamList = this.state.sanPhamList.map((c) =>
            <tr>
                <td data-th="Product">
                    <div class="row">
                        <div class="col-sm-7 hidden-xs "><img src={c.hinhAnh} alt="Sản phẩm 1" class="img-responsive" width="100"></img>
                        </div>
                        <div class="col-sm-5">
                            <p class="nomargin">{c.tenSanPham}</p>
                        </div>
                    </div>
                </td>
                <td data-th="Price">{c.gia} đ</td>
                <td data-th="Quantity"><input class="form-control text-center" value={c.loai} type="number" />
                </td>
                <td data-th="Subtotal" class="text-center">{c.hsDiscount} </td>
                <td class="actions" data-th="">
                    <button class="btn btn-info btn-sm"><i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        )
        return (
            <div className="container">
                <div className="row">
                    <div className="col-7">

                        <table id="cart" class="table table-hover table-condensed">
                            <thead>
                                <tr>

                                    <th class="col-sm-5">Tên sản phẩm</th>
                                    <th class="col-sm-1">Giá</th>
                                    <th class="col-sm-2">Loại</th>
                                    <th class="text-center col-sm-2">Mô tả</th>
                                    <th class="col-sm-2"> </th>

                                </tr>
                            </thead>
                            <tbody>
                                {sanPhamList}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-5">
                        <form>
                            <div class="form-row">
                                <h1>Thêm Sản Phẩm</h1>
                                <div class="form-group col-md-12">
                                    <label for="inputEmail4">Tên sản Phẩm</label>
                                    <input type="name" class="form-control" value={this.state.tenSanPham} onChange={(e) => this.handleChangeObj(e, "tenSanPham")} placeholder="Tên Sản Phẩm" />
                                </div>
                                <div class="form-group col-md-12">
                                    <label for="inputEmail4">Giá</label>
                                    <input type="number" class="form-control" value={this.state.gia} onChange={(e) => this.handleChangeObj(e, "gia")} placeholder="Giá Sản Phẩm" />
                                </div>
                                <div class="form-group col-md-12">
                                    <label for="inputEmail4">Loại</label>
                                    <input type="name" class="form-control" value={this.state.loai} onChange={(e) => this.handleChangeObj(e, "loai")} placeholder="Loại Sản Phẩm" />
                                </div>
                                <div class="form-group col-md-12">
                                    <label for="inputEmail4">Mô tả</label>
                                    <input type="name" class="form-control" value={this.state.mota} onChange={(e) => this.handleChangeObj(e, "mota")} placeholder="Mô tả" />
                                </div>
                                <div class="form-group col-md-12">
                                    <label for="inputEmail4">Hệ số Discount</label>
                                    <input type="number" class="form-control" value={this.state.hsDiscount} onChange={(e) => this.handleChangeObj(e, "hsDiscount")} placeholder="Hệ số Discount" />
                                </div>
                                <div class="form-group col-md-12">
                                    <label for="inputEmail4">Hình Ảnh</label>
                                    <input type="name" class="form-control" value={this.state.hinhAnh} onChange={(e) => this.handleChangeObj(e, "hinhAnh")} placeholder="Hình Ảnh" />
                                </div>
                                <div class="form-group col-md-12">
                                    <input type="submit" class="form-control" className="btn-success" onClick={() => this.callApiAddSanPham()} placeholder="" />
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}
export default withRouter(Product);