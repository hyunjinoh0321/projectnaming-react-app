import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import { deleteVersion } from './api';  // delete 공통 함수 : api.js

export default function VersionView() {
  const [id, setId] = useState(useParams().id);
  const [Version, setVersion] = useState({
    applyDate: '',
    versions: [],
    server:'',
    contents:'',
    requester:'',
    manager:'',
    result:''
  });

  useEffect(() => {
    axios.get(`http://172.23.125.110:3030/version/${id}`)
      .then((response) => {
        console.log("Version type : " + typeof(response.data.versions))
        setVersion(response.data);
      })
      .catch((error) => {
        console.log("Error while geting Version:", error);
      })
  }, [id]);

  const navigate = useNavigate();

  const handleDeleteConfirm = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteVersion(id)           // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Version deleted successfully.");
          navigate("/projectnaming/Version/list");
        })
        .catch((error) => {
          console.log("Error while deleting Version:", error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-3">버전처리 기록 조회</h2>
      <div className="card">
        <div className="card-header">
            <Link className="btn btn-outline-primary mx-1" to="/projectnaming/Version/list">버전처리 기록 목록</Link>
            <Link to={`/projectnaming/Version/edit/${Version._id}`} className="btn btn-outline-success mx-1">버전처리 기록 수정</Link>
            <button onClick={()=>handleDeleteConfirm(Version._id)} className="btn btn-outline-danger mx-1">버전처리 기록 삭제</button>
        </div>
        <div className="card-body">
          <b className="text-muted">일자:</b>
          <p>{Version.applyDate}</p>
          <b className="text-muted">프로그램:</b>
          <p>
          { 
            Version.versions.map((versions, index) => 
            <li key = {index}>
              {
                versions.versionFile + '(' + versions.type + ')'
              }
            </li>
            )
          } 
          </p>
          <b className="text-muted">서버:</b>
          <p>{Version.server}</p>
          <b className="text-muted">내용:</b>
          <p>{Version.contents}</p>
          <b className="text-muted">담당:</b>
          <p>{Version.requester}</p>
          <b className="text-muted">관리:</b>
          <p>{Version.manager}</p>
          <b className="text-muted">결과:</b>
          <p>{Version.result}</p>    
         
        </div>
      </div>
    </div>
  );
}