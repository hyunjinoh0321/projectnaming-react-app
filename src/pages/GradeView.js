import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import { deleteGrade } from './api';  // delete 공통 함수 : api.js

export default function GradeView() {
  const [id, setId] = useState(useParams().id);
  const [Grade, setGrade] = useState({grade:'', code:''});

  useEffect(() => {
    axios.get(`http://172.23.125.110:3030/projectnaming/grade/${id}`)
      .then((response) => {
        setGrade(response.data);
      })
      .catch((error) => {
        console.log("Error while geting Grade:", error);
      })
  }, [id]);

  const navigate = useNavigate();

  const handleDeleteConfirm = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteGrade(id)           // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Grade deleted successfully.");
          navigate("/projectnaming/grade/list");
        })
        .catch((error) => {
          console.log("Error while deleting Grade:", error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-3">Grade 조회</h2>
      <div className="card">
        <div className="card-header">
            <Link className="btn btn-outline-primary mx-1" to="/projectnaming/grade/list">Grade 목록</Link>
            <Link to={`/projectnaming/grade/edit/${Grade._id}`} className="btn btn-outline-success mx-1">수정</Link>
            <button onClick={()=>handleDeleteConfirm(Grade._id)} className="btn btn-outline-danger mx-1">삭제</button>
        </div>
        <div className="card-body">
          <b className="text-muted">등급:</b>
          <p>{Grade.grade}</p>
          <b className="text-muted">코드:</b>
          <p>{Grade.code}</p>
        </div>
      </div>
    </div>
  );
}