import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import { deleteGrade } from './api';  // delete 공통 함수 : api.js
 
export default function GradeList() {
  const  [gradeData, setGradeData] = useState([]);
  
  useEffect(() => {
    fetchGradeList()
  }, []);
  
  const fetchGradeList = () => {
    axios.get('http://172.23.125.110:3030/projectnaming/grade')
      .then((response) => {
        setGradeData(response.data);
      })
      .catch((error) => {
        console.log("Error while fetching Grades:", error);
      });
  }
  
  const handleDeleteConfirm = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteGrade(id)            // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Grade deleted successfully.");
          fetchGradeList();
        })
        .catch((error) => {
          console.log("Error while deleting book:", error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-1 mb-3">Grade 목록</h2>
      <div className="card">
        <div className="card-header">
          <Link className="btn btn-outline-primary mx-1" to="/projectnaming/grade/add">Grade 등록</Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered" size="small">
            <thead>
              <tr>
                <th ><center>등급</center></th>
                <th ><center>코드</center></th>
                <th width="220px" ><center>Action</center></th>
              </tr>
            </thead>
            <tbody>
              {gradeData.map((grade, key)=>{
                return (
                  <tr key={key}>
                    <td align='center'>{grade.grade}</td>
                    <td align='center'>{grade.code}</td>
                    <td align='center'>
                      <Link to={`/projectnaming/grade/view/${grade._id}`} className="btn btn-outline-info mx-1">조회</Link>
                      <Link to={`/projectnaming/grade/edit/${grade._id}`} className="btn btn-outline-success mx-1">수정</Link>
                      <button onClick={()=>handleDeleteConfirm(grade._id)} className="btn btn-outline-danger mx-1">삭제</button>
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