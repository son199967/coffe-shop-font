import { withRouter } from "react-router-dom";
import React, { Component } from 'react';
import axios from "axios";
import { API_BASE_URL ,ACCESS_TOKEN_NAME} from '../../../constants/apiContants';
class QuanLyNhanVien extends Component {

constructor(props){
    super(props)
    this.state={
        caLamViec : [
            {
                id:null,
                tenClV:"",
                gioBatDau:"",
                gioKetThuc:"",
                ngay:"",
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

callApiGetAllCaLamViec = async () => {
    const caLamViec = await axios.get(API_BASE_URL + '/getAllCalamNextWeek')
        .then(function (response) {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    this.setState({caLamViec })
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
      this.callApiGetAllCaLamViec();
}


render(){
    console.log("caLamViec",this.state.caLamViec)
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
}
}
export default withRouter(QuanLyNhanVien)