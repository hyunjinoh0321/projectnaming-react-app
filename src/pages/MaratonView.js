import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import { deleteMaraton } from './api';  // delete 공통 함수 : api.js

export default function MaratonView() {
  const [id, setId] = useState(useParams().id);
  const [Maraton, setMaraton] = useState({
    name: '',
    eventDate: '',
    eventName:'',
    type:'',
    record:''
  });

  useEffect(() => {
    axios.get(`http://172.23.125.110:3030/maraton/${id}`)
      .then((response) => {
        setMaraton(response.data);
      })
      .catch((error) => {
        console.log("Error while geting Maraton:", error);
      })
  }, [id]);

  const navigate = useNavigate();

  const handleDeleteConfirm = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteMaraton(id)           // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Maraton deleted successfully.");
          navigate("/projectnaming/Maraton/list");
        })
        .catch((error) => {
          console.log("Error while deleting Maraton:", error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-3">마라톤 기록 조회</h2>
      <div className="card">
        <div className="card-header">
            <Link className="btn btn-outline-primary mx-1" to="/projectnaming/Maraton/list">마라톤 기록 목록</Link>
            <Link to={`/projectnaming/Maraton/edit/${Maraton._id}`} className="btn btn-outline-success mx-1">마라톤 기록 수정</Link>
            <button onClick={()=>handleDeleteConfirm(Maraton._id)} className="btn btn-outline-danger mx-1">마라톤 기록 삭제</button>
        </div>
        <div className="card-body">
          <b className="text-muted">참가자:</b>
          <p>{Maraton.name}</p>
          <b className="text-muted">대회일:</b>
          <p>{Maraton.eventDate}</p>
          <b className="text-muted">대회명:</b>
          <p>{Maraton.eventName}</p>
          <b className="text-muted">참가종목:</b>
          <p>{Maraton.type}</p>
          <b className="text-muted">기록:</b>
          <p>{Maraton.record}</p>                  
        </div>
      </div>
    </div>
  );
}