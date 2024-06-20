import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import { deleteRule } from './api';  // delete 공통 함수 : api.js
 
export default function RuleList() {
  const  [ruleData, setRuleData] = useState([]);
  
  useEffect(() => {
    fetchRuleList()
  }, []);
  
  const fetchRuleList = () => {
    axios.get('http://172.23.125.110:3030/projectnaming/rule')
      .then((response) => {
        setRuleData(response.data);
      })
      .catch((error) => {
        console.log("Error while fetching Rules:", error);
      });
  }
  
  const handleDeleteConfirm = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteRule(id)            // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Rule deleted successfully.");
          fetchRuleList();
        })
        .catch((error) => {
          console.log("Error while deleting book:", error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt- mb-3">프로젝트 네이밍 목록</h2>
      <div className="card" >
        <div className="card-header">
          <Link className="btn btn-outline-primary mx-1" to="/projectnaming/rule/add">프로젝트 네이밍 등록</Link>
        </div>
        <div className="card-body" size="">
          <table className="table table-bordered" >
            <thead>
              <tr >
                <th width="120px"><center>요청부서</center></th>
                <th width="80px"><center>요청자</center></th>
                <th width="80px"><center>작성자</center></th>
                <th width="500px"><center>프로젝트 명칭</center></th>
                <th width="100px"><center>산출물</center></th>
                <th width="220px"><center>Action</center></th>
              </tr>
            </thead>
            <tbody>           
              {ruleData.map((rule, key)=>{
                return (
                  <tr key={key}>
                    <td align='center'>{rule.requestTeam}</td>
                    <td align='center'>{rule.requester}</td>
                    <td align='center'>{rule.writer}</td>
                    <left><td >{rule.projectName}</td></left>
                    <td align='center'>{rule.outputs}</td>
                    <td align='center'>
                      <Link to={`/projectnaming/rule/view/${rule._id}`} className="btn btn-outline-info mx-1">조회</Link>
                      <Link to={`/projectnaming/rule/edit/${rule._id}`} className="btn btn-outline-success mx-1">수정</Link>
                      <button onClick={()=>handleDeleteConfirm(rule._id)} className="btn btn-outline-danger mx-1">삭제</button>
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