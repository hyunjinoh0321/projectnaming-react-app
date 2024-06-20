import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import { deleteWork } from './api';  // delete 공통 함수 : api.js
 
export default function WorkList() {
  const  [workData, setWorkData] = useState([]);
  
  useEffect(() => {
    fetchWorkList()
  }, []);
  
  const fetchWorkList = () => {
    axios.get('http://172.23.125.110:3030/projectnaming/work')
      .then((response) => {
        setWorkData(response.data);
      })
      .catch((error) => {
        console.log("Error while fetching Works:", error);
      });
  }
  
  const handleDeleteConfirm = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteWork(id)            // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Work deleted successfully.");
          fetchWorkList();
        })
        .catch((error) => {
          console.log("Error while deleting book:", error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-1 mb-3">업무 목록</h2>
      <div className="card">
        <div className="card-header">
          <Link className="btn btn-outline-primary mx-1" to="/projectnaming/work/add">업무 등록</Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th ><center>업무</center></th>
                <th >업무코드</th>
                <th width="220px" >Action</th>
              </tr>
            </thead>
            <tbody>
              {workData.map((work, key)=>{
                return (
                  <tr key={key}>
                    <td align='center'>{work.work}</td>
                    <td align='center'>{work.workCode}</td>
                    <td align='center'>
                      <Link to={`/projectnaming/work/view/${work._id}`} className="btn btn-outline-info mx-1">조회</Link>
                      <Link to={`/projectnaming/work/edit/${work._id}`} className="btn btn-outline-success mx-1">수정</Link>
                      <button onClick={()=>handleDeleteConfirm(work._id)} className="btn btn-outline-danger mx-1">삭제</button>
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