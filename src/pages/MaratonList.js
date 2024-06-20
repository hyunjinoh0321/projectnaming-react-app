import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

import { deleteMaraton } from './api';  // delete 공통 함수 : api.js
 
export default function MaratonList() {
  const navigate = useNavigate(); 
  const  [maratonData, setMaratonData] = useState([]);

  const  [searchName, setSearchName] = useState([]);
  
  useEffect(() => {
    fetchMaratonList()
  }, []);
  
  const fetchMaratonList = () => {
    axios.get('http://172.23.125.110:3030/maraton')
      .then((response) => {
        setMaratonData(response.data);
      })
      .catch((error) => {
        console.log("Error while fetching Works:", error);
      });
  }
  
  const handleDeleteConfirm = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteMaraton(id)            // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Maraton deleted successfully.");
          fetchMaratonList();
        })
        .catch((error) => {
          console.log("Error while deleting book:", error);
        });
    }
  }

  const handleSearchName = (event) => {
    navigate(`/projectnaming/maraton/search/${searchName}`);     
  }

  const onCheckEnter = (e) => {
    if(e.key === 'Enter') {
      handleSearchName();
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-1 mb-3"> 목록</h2>
      <div className="card">
        <div className="card-header">
          <Link className="btn btn-outline-primary mx-1" to="/projectnaming/maraton/add">마라톤 기록 등록</Link>
        </div>
        <div className="card-body">
              <b className="text-muted">이름조회:</b>
              <div class="input-group mb-3" >
                <input
                  onChange={(event) => {setSearchName(event.target.value)}} 
                  onKeyDown={(e) => onCheckEnter(e)}
                  value={searchName}
                  type="text"
                  class="form-control"
                  placeholder="Please Input name"
                  aria-label="Please Input name"
                  aria-describedby="basic-addon2"
                  name="searchName"
                  >
                </input>
                <div class="input-group-append">
                  <button 
                    onClick={()=>handleSearchName()}
                    class="btn btn-outline-secondary" type="button">조회</button>
                </div>
              </div>  
        </div>  
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th width="100px" ><center>참가자</center></th>
                <th width="100px" ><center>대회일</center></th>
                <th width="220px" ><center>대회명</center></th>
                <th width="100px" ><center>참가종목</center></th>
                <th width="100px" ><center>기록</center></th>
                <th width="220px" ><center>Action</center></th>
              </tr>          
            </thead>
            <tbody>
              {maratonData.map((maraton, key)=>{
                return (
                  <tr key={key}>
                    <td align='center'>{maraton.name}</td>
                    <td align='center'>{maraton.eventDate}</td>
                    <td align='center'>{maraton.eventName}</td>
                    <td align='center'>{maraton.type}</td>
                    <td align='center'>{maraton.record}</td>
                    <td align='center'>
                      <Link to={`/projectnaming/maraton/view/${maraton._id}`} className="btn btn-outline-info mx-1">조회</Link>
                      <Link to={`/projectnaming/maraton/edit/${maraton._id}`} className="btn btn-outline-success mx-1">수정</Link>
                      <button onClick={()=>handleDeleteConfirm(maraton._id)} className="btn btn-outline-danger mx-1">삭제</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}