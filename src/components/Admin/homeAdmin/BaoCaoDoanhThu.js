import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../../constants/apiContants';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import Moment from 'react-moment';

class BaoCaoDoanhThu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        month:new Date().getMonth()+1,
        date:new Date(),
        thang:"",
        doanhthu:null,
        hoaDon: [{
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

        }]
    }
  }
  componentDidMount(){
    this.baocaodaonhthutheoNgay()
  }
  baocaodaonhthutheoNgay = async () => {
    const hoaDon = await axios.get(API_BASE_URL + '/getHoaDonDate?ngay=' + this.state.date.getDate()+"&thang="+(this.state.date.getMonth()+1)+"&nam="+this.state.date.getFullYear(), {
        headers: { authorization: localStorage.getItem(ACCESS_TOKEN_NAME) }
    }).then(function (response) {
        console.log("user1", response);
        if (response.status === 200) {
            return response.data

        }
    })
    const doanhthu = await axios.get(API_BASE_URL + '/doanhThuNgay?ngay=' + this.state.date.getDate()+"&thang="+(this.state.date.getMonth()+1)+"&nam="+this.state.date.getFullYear(), {
        headers: { authorization: localStorage.getItem(ACCESS_TOKEN_NAME) }
    }).then(function (response) {
        console.log("user1", response);
        if (response.status === 200) {
            return response.data

        }
    })
   

    this.setState({ hoaDon ,doanhthu})

}
baocaodaonhthutheoThang = async () => {
    const hoaDon = await axios.get(API_BASE_URL + '/getHoaDonMonth?thang='+(this.state.thang)+"&nam="+this.state.date.getFullYear(), {
        headers: { authorization: localStorage.getItem(ACCESS_TOKEN_NAME) }
    }).then(function (response) {
        console.log("user1", response);
        if (response.status === 200) {
            return response.data

        }
    })
    const doanhthu = await axios.get(API_BASE_URL + '/doanhThuThang?thang='+(this.state.thang)+"&nam="+this.state.date.getFullYear(), {
        headers: { authorization: localStorage.getItem(ACCESS_TOKEN_NAME) }
    }).then(function (response) {
        console.log("user1", response);
        if (response.status === 200) {
            return response.data

        }
    })

    this.setState({ hoaDon,doanhthu })

}

setStartDate= async(date)=>{
await this.setState({date:date})
 await this.baocaodaonhthutheoNgay()
}
handleChange = async(e) => {
    await this.setState({thang:e.target.value});
  await this.baocaodaonhthutheoThang();
   }

  
  render() {
      console.log("xx",this.state.doanhthu)
   const donhang= this.state.hoaDon.map((d,i)=> 
   <tr>
   <th scope="row">{i}</th>
   <td><Moment date={d.time} /></td>
  <td>{d.hoaDonChiTiet.map(s=> <p>{s.sanPham.tenSanPham}:{s.soLuong}</p>)}</td>
  <td>{d.tongTien}</td>
 </tr>
    )
    return (
        <div>

        
     <div className='p-5 m-5 row'>
         
           <div className="col-6">
               <h3>Xem Don Ngay</h3>
           <DatePicker  value={this.state.date} onChange={date => this.setStartDate(date)} />

           </div>
           <div className="col-6">
               <h3> Bao cao doanh thu thang</h3>
               <form>
           <div className="form-group">
   
   <select class="form-control" value={this.state.thang} onChange={(e)=>this.handleChange(e)}  >
     <option value="1">Tháng  1</option>
     <option  value="2">Tháng  2</option>
     <option value="3">Tháng  3</option>
     <option  value="4">Tháng  4</option>
     <option value="5"> Tháng  5</option>
     <option value="6">Tháng  6</option>
     <option value="7">Tháng  7</option>
     <option value="8">Tháng  8</option>
     <option value="9">Tháng  9</option>
     <option value="10">Tháng  10</option>
     <option value="11">Tháng  11</option>
      <option value="12">Tháng  12</option>
   </select>
 </div>
 </form>
           </div>
     </div>

     <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Giờ</th>
      <th scope="col">Sản phẩm</th>
      <th scope="col">Tổng tiền</th>

    </tr>
  </thead>
  <tbody>
    {donhang}
  </tbody>
</table>
<div> 
    <h4 class="text-primary">Tổng doanh thu :{this.state.doanhthu}</h4>
</div>
     </div>
    )
  }
}

export default withRouter(BaoCaoDoanhThu);