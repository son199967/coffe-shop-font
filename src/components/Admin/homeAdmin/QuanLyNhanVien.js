import { withRouter } from "react-router-dom";
import React, { Component } from 'react';
import axios from "axios";
import Moment from 'react-moment';
import { API_BASE_URL ,ACCESS_TOKEN_NAME} from '../../../constants/apiContants';
class QuanLyNhanVien extends Component {

constructor(props){
    super(props)
    this.state={
       status:"1",
       month:12,
       year:2020,
       total:0,
        caLamViec : [
            {
                id:null,
                tenClV:"",
                gioBatDau:"",
                gioKetThuc:"",
                ngay:"",
                hs:1,
                nhanVien:[
                    {
                        username:"",

                    }
                ]
            }

        ]

        
    }
}
componentDidMount(){
    this.callApiGetAllCaLamViec()
}
handleChange = async(e) => {
 await this.setState({month:e.target.value});
await this.callApiGetLuong();x
}
handleChangeYear = async(e) => {
  await this.setState({year:e.target.value});
 await this.callApiGetLuong();
 }
callApiGetAllCaLamViec = async () => {
    const caLamViec = await axios.get(API_BASE_URL + '/getAllCalamInWeeK')
        .then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    this.setState({caLamViec :caLamViec,status:"1"})
}
callApiGetLuong = async () => {
  const caLamViec = await axios.get(API_BASE_URL + '/getBangTinhCong?month='+this.state.month+"&year="+this.state.year,{
    headers: {
        Authorization: localStorage.getItem(ACCESS_TOKEN_NAME)
    }
})
      .then(function (response) {
          if (response.status === 200) {
              return response.data;
          }
      })
      .catch(function (error) {
          console.log(error);
      });
      const total = await axios.get(API_BASE_URL + '/tinhTongTienLuong?month='+this.state.month+"&year="+this.state.year,{
        headers: {
            Authorization: localStorage.getItem(ACCESS_TOKEN_NAME)
        }
    })
          .then(function (response) {
              if (response.status === 200) {
                  return response.data;
              }
          })
          .catch(function (error) {
              console.log(error);
          });
    
  this.setState({caLamViec,total})
}
callApiDangKiTuanToi = async () => {
  const caLamViec = await axios.get(API_BASE_URL + '/getAllCalamNextWeek')
      .then(function (response) {
          if (response.status === 200) {
              return response.data;
          }
      })
      .catch(function (error) {
          console.log(error);
      });

  this.setState({caLamViec :caLamViec,
  status:"2"})

}
baoCaoLuongCodinh = async () => {
  this.callApiGetLuong();
  this.setState({status:"3"})

}
registerCaLamViec = async (id) => {
  await axios.get(API_BASE_URL + '/register?id='+id,{
    headers: { authorization: localStorage.getItem(ACCESS_TOKEN_NAME) }
})
      .then(function (response) {
          if (response.status === 200) {
            if(response.data===1){
              alert("Ca này đã đầy hoặc bạn đã đăng kí")
            }
              return response.data;
          }
      })
      .catch(function (error) {
          console.log(error);
      });
      this.callApiDangKiTuanToi();
}


render(){
    console.log("caLamViec",this.state.caLamViec)
    console.log("status",this.state.status)
    const x= this.state.status

   
      

       
    
      if (x==="2") {
        const ca1 = this.state.caLamViec
   .filter(x=>x.tenClV==="1")
   .map((c) =>      
     <td>
            <p class="text-warning">{c.nhanVien.length} đăng kí</p>
           
                <input type="button" class="btn btn-primary" onClick={()=>this.registerCaLamViec(c.id)} value="register" />
          
             {c.nhanVien.map((u,i)=><h6 className="pt-2">nv{i+1}:{u.username}</h6>)}
        
     </td> )
    const ca2 = this.state.caLamViec
    .filter(x=>x.tenClV==="2")
    .map((c) =>      
      <td>
              <p class="text-warning">{c.nhanVien.length} đăng kí</p>
              <input type="button" class="btn btn-primary" onClick={()=>this.registerCaLamViec(c.id)} value="register" />
              {c.nhanVien.map((u,i)=><h6 className="pt-2">nv{i+1}:{u.username}</h6>)}
         
      </td> )
    const ca3 = this.state.caLamViec
    .filter(x=>x.tenClV==="3")
    .map((c) =>      
      <td>
              <p class="text-warning">{c.nhanVien.length} đăng kí</p>
              <input type="button" class="btn btn-primary" onClick={()=>this.registerCaLamViec(c.id)} value="register" />
              {c.nhanVien.map((u,i)=><h6 className="pt-2">nv{i+1}:{u.username}</h6>)}
      </td> )
    return(

        <div className="m-5">
          <div className="row m-5">
          <div className="col-4">
              <input type="button" class="btn btn-danger" onClick={()=>this.callApiGetAllCaLamViec()} value="Thời gian biểu trong tuần" />
              </div>
              <div className="col-4">
              <input type="button" class="btn btn-danger" onClick={()=>this.callApiDangKiTuanToi()} value="Đăng kí lịch tuần tới" />
              </div>
              <div className="col-4">
              <input type="button" class="btn btn-danger" onClick={()=>this.baoCaoLuongCodinh()} value="Báo cáo luơng" />
              </div>

          </div>
            <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Thứ 2</th>
      <th scope="col">Thứ 3</th>
      <th scope="col">Thứ 4</th>
      <th scope="col">Thứ 5</th>
      <th scope="col">Thứ 6</th>
      <th scope="col">Thứ Bảy</th>
      <th scope="col">Chủ nhật</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">7h30-12h</th>
     {ca1}
    </tr>
    <tr>
      <th scope="row">12h-17h30</th>
      {ca2}
    </tr>
    <tr>
      <th scope="row">17h30-23h</th>
      {ca3}
    </tr>
  </tbody>
</table>
        </div>
    )
      } else if(x==="1"){
        console.log("mm1")
        const ca1xx = this.state.caLamViec
      .filter(x=>x.tenClV==="1")
      .map((c) =>      
        <td>
               <p class="text-warning">{c.nhanVien.length} đăng kí</p>
                           
                {c.nhanVien.map((u,i)=><h6 className="pt-2">nv{i+1}:{u.username}</h6>)}
           
        </td> )
       const ca2xx = this.state.caLamViec
       .filter(x=>x.tenClV==="2")
       .map((c) =>      
         <td>
                 <p class="text-warning">{c.nhanVien.length} đăng kí</p>
                 {c.nhanVien.map((u,i)=><h6 className="pt-2">nv{i+1}:{u.username}</h6>)}
            
         </td> )
       const ca3xx = this.state.caLamViec
       .filter(x=>x.tenClV==="3")
       .map((c) =>      
         <td>
                 <p class="text-warning">{c.nhanVien.length} đăng kí</p>
                 {c.nhanVien.map((u,i)=><h6 className="pt-2">nv{i+1}:{u.username}</h6>)}
         </td> )
        console.log("bbb")
        return(

          <div className="m-5">
            <div className="row m-5">
              <div className="col-4">
              <input type="button" class="btn btn-danger" onClick={()=>this.callApiGetAllCaLamViec()} value="Thời gian biểu trong tuần" />
              </div>
              <div className="col-4">
              <input type="button" class="btn btn-danger" onClick={()=>this.callApiDangKiTuanToi()} value="Đăng kí lịch tuần tới" />
              </div>
              <div className="col-4">
              <input type="button" class="btn btn-danger" onClick={()=>this.baoCaoLuongCodinh()} value="Bao cao luong" />
              </div>
  
            </div>
              <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Thứ 2</th>
        <th scope="col">Thứ 3</th>
        <th scope="col">Thứ 4</th>
        <th scope="col">Thứ 5</th>
        <th scope="col">Thứ 6</th>
        <th scope="col">Thứ Bảy</th>
        <th scope="col">Chủ nhật</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">7h30-12h</th>
       {ca1xx}
      </tr>
      <tr>
        <th scope="row">12h-17h30</th>
        {ca2xx}
      </tr>
      <tr>
        <th scope="row">17h30-23h</th>
        {ca3xx}
      </tr>
    </tbody>
  </table>
          </div>
      )
      }else{
        const caLuong= this.state.caLamViec.map((c,i)=>
        <tr>
        <th scope="row">{i}</th>
<td>Ca:{c.tenClV}</td>
<td>{c.gioBatDau}-{c.gioKetThuc}</td>
<td>  <Moment format="YYYY/MM/DD">
{c.ngay}
            </Moment>
            </td>
<td>{c.hs}</td>
<td></td>
      </tr>
        )
        console.log("month",this.state.month)
        
        return(
          

          <div className="m-5">
            <div className="row m-5">
              <div className="col-4">
              <input type="button" class="btn btn-danger" onClick={()=>this.callApiGetAllCaLamViec()} value="Thời gian biểu trong tuần" />
              </div>
              <div className="col-4">
              <input type="button" class="btn btn-danger" onClick={()=>this.callApiDangKiTuanToi()} value="Đăng kí lịch tuần tới" />
              </div>
              <div className="col-4">
              <input type="button" class="btn btn-danger" onClick={()=>this.baoCaoLuongCodinh()} value="Báo cáo lương cố định" />
              </div>
  
            </div>
            <div className="row">
              <form>
              <div className="form-group">
   
    <select class="form-control" value={this.state.month} onChange={(e)=>this.handleChange(e)}  >
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
  <div class="form-group ">
   
    <select class="form-control" value={this.state.year} onChange={(e)=>this.handleChangeYear(e)}  >
      <option value="2019">Năm 2019</option>
      <option  value="2020">Năm  2020</option>
      <option value="2021">Năm 2021</option>
      
    </select>
  </div>
              </form>
               </div>
              <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Ca</th>
        <th scope="col">Thời gian</th>
        <th scope="col">Ngày</th>
        <th scope="col">Hệ số</th>
      </tr>
    </thead>
    <tbody>
      {caLuong}
    </tbody>
  </table>
  <div>
     <h4>tông tiền:{this.state.total}</h4>
  </div>
          </div>
      )
      }
}
}
export default withRouter(QuanLyNhanVien)