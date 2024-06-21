import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import { deleteVersion } from './api';  // delete 공통 함수 : api.js
 
export default function VersionSearchList() {
  const navigate = useNavigate(); 
  const  [versionData, setVersionData] = useState([]);

  const  [searchName, setSearchName] = useState(useParams().name);
  
  useEffect(() => {
    fetchVersionList()
  }, []);
  
  const fetchVersionList = () => {
    axios.get(`http://172.23.125.110:3030/version/search/${searchName}`)
      .then((response) => {
        setVersionData(response.data);
      })
      .catch((error) => {
        console.log("Error while fetching Works:", error);
      });
  }
  
  const handleDeleteConfirm = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteVersion(id)            // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Version deleted successfully.");
          fetchVersionList();
        })
        .catch((error) => {
          console.log("Error while deleting book:", error);
        });
    }
  }

  const handleSearchName = (event) => {
    axios.get(`http://172.23.125.110:3030/version/search/${searchName}` )
      .then((response) => {
        setVersionData(response.data);
      })
      .catch((error) => {
        console.log("Error while adding Version:", error);
      });      
  }

  const onCheckEnter = (e) => {
    if(e.key === 'Enter') {
      handleSearchName();
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-1 mb-3">버전처리 목록</h2>
      <div className="card">
        <div className="card-header">
          <Link className="btn btn-outline-primary mx-1" to="/projectnaming/version/add">버전처리 등록</Link>
        </div>
        <div className="card-body">
              <b className="text-muted">등록자 조회:</b>
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
                <th width="100px" ><center>일자</center></th>
                <th width="250px" ><center>프로그램</center></th>
                <th width="120px" ><center>적용장비</center></th>
                <th width="350px" ><center>내용</center></th>
                <th width="70px" ><center>담당</center></th>
                <th width="70px" ><center>관리</center></th>
                <th width="70px" ><center>결과</center></th>
                <th width="220px" ><center>Action</center></th>
              </tr>          
            </thead>
            <tbody>
              {versionData.map((version, key)=>{
                return (
                  <tr key={key}>
                    <td align='center'>{version.applyDate}</td>
                    <td align='center'>
                      { version.versions.map((versions, index) => 
                          <li key = {index}>
                            {
                              versions.versionFile + '(' + versions.type + ')'
                            }
                          </li>
                        )
                      } 
                    </td>
                    <td align='center'>{version.server}</td>
                    <td >{version.contents}</td>
                    <td align='center'>{version.requester}</td>
                    <td align='center'>{version.manager}</td>
                    <td align='center'>{version.result}</td>
                    <td align='center'>
                      <Link to={`/projectnaming/version/view/${version._id}`} className="btn btn-outline-info mx-1">조회</Link>
                      <Link to={`/projectnaming/version/edit/${version._id}`} className="btn btn-outline-success mx-1">수정</Link>
                      <button onClick={()=>handleDeleteConfirm(version._id)} className="btn btn-outline-danger mx-1">삭제</button>
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