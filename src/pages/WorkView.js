import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import { deleteWork } from './api';  // delete 공통 함수 : api.js

export default function WorkView() {
  const [id, setId] = useState(useParams().id);
  const [Work, setWork] = useState({work:'', code:''});

  useEffect(() => {
    axios.get(`http://172.23.125.110:3030/projectnaming/work/${id}`)
      .then((response) => {
        setWork(response.data);
      })
      .catch((error) => {
        console.log("Error while geting Work:", error);
      })
  }, [id]);

  const navigate = useNavigate();

  const handleDeleteConfirm = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteWork(id)           // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Work deleted successfully.");
          navigate("/projectnaming/work/list");
        })
        .catch((error) => {
          console.log("Error while deleting Work:", error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-3">Work 조회</h2>
      <div className="card">
        <div className="card-header">
            <Link className="btn btn-outline-primary mx-1" to="/projectnaming/work/list">업무 목록</Link>
            <Link to={`/projectnaming/work/edit/${Work._id}`} className="btn btn-outline-success mx-1">수정</Link>
            <button onClick={()=>handleDeleteConfirm(Work._id)} className="btn btn-outline-danger mx-1">삭제</button>
        </div>
        <div className="card-body">
          <b className="text-muted">업무:</b>
          <p>{Work.work}</p>
          <b className="text-muted">업무코드:</b>
          <p>{Work.workCode}</p>
        </div>
      </div>
    </div>
  );
}