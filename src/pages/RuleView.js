import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import { deleteRule } from './api';  // delete 공통 함수 : api.js

export default function RuleView() {
  const [id, setId] = useState(useParams().id);
  const [Rule, setRule] = useState({grade:'', 
                                    workCode:'',
                                    no : ' ',
                                    title : ' ',
                                    expectStartDate : ' ', expectEndDate : ' ', requestDate : ' ',
                                    requestTeam : ' ', requester : ' ', writer: ' ', projectName: ' ', outputs : ' '});

  useEffect(() => {
    axios.get(`http://172.23.125.110:3030/projectnaming/rule/${id}`)
      .then((response) => {
        setRule(response.data);
      })
      .catch((error) => {
        console.log("Error while geting Rule:", error);
      })
  }, [id]);

  const navigate = useNavigate();

  const handleDeleteConfirm = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteRule(id)           // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Rule deleted successfully.");
          navigate("/projectnaming/rule/list");
        })
        .catch((error) => {
          console.log("Error while deleting Rule:", error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-3">Rule 조회</h2>
      <div className="card">
        <div className="card-header">
            <Link className="btn btn-outline-primary mx-1" to="/projectnaming/rule/list">프로젝트 네이밍 목록</Link>
            <Link to={`/projectnaming/rule/edit/${Rule._id}`} className="btn btn-outline-success mx-1">수정</Link>
            <button onClick={()=>handleDeleteConfirm(Rule._id)} className="btn btn-outline-danger mx-1">삭제</button>
        </div>
        <div className="card-body">
          <b className="text-muted">위험등급:</b>
          <p>{Rule.grade}</p>
          <b className="text-muted">업무코드:</b>
          <p>{Rule.workCode}</p>
          <b className="text-muted">일련번호:</b>
          <p>{Rule.no}</p>
          <b className="text-muted">제목:</b>
          <p>{Rule.title}</p>
          <b className="text-muted">예상시작:</b>
          <p>{Rule.expectStartDate}</p>
          <b className="text-muted">예상종료:</b>
          <p>{Rule.expectEndDate}</p>
          <b className="text-muted">요청일:</b>
          <p>{Rule.requestDate}</p>
          <b className="text-muted">요청팀:</b>
          <p>{Rule.requestTeam}</p>
          <b className="text-muted">요청자:</b>
          <p>{Rule.requester}</p>
          <b className="text-muted">작성자:</b>
          <p>{Rule.writer}</p>
          <b className="text-muted">프로젝트 네이밍:</b>
          <p>{Rule.projectName}</p>
          <b className="text-muted">산출물:</b>
          <p>{Rule.outputs}</p>
        </div>      
      </div>
    </div>
  );
}