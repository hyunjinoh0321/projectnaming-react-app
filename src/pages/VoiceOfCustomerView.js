import React, {useState, useEffect, useRef, any} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import { deleteBoard } from './api';  // delete 공통 함수 : api.js

import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function VoiceOfCustomerView() {
  const [id, setId] = useState(useParams().id);
  const [board, setBoard] = useState({no:'', 
                                      title:'',
                                      description : '',
                                      creator : ' ',
                                      createdDt : ' '});

  const quillRef = useRef<any>(null);

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "size",
    "header",
    "color",
    "background",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
  ];

  useEffect(() => {
    axios.get(`http://172.23.125.110:3030/projectnaming/board/${id}`)
      .then((response) => {
        setBoard(response.data);
      })
      .catch((error) => {
        console.log("Error while geting Board:", error);
      })
  }, [id]);

  const navigate = useNavigate();

  const handleDeleteConfirm = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteBoard(id)           // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Board deleted successfully.");
          navigate("/projectnaming/board/list");
        })
        .catch((error) => {
          console.log("Error while deleting Board:", error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-3">게시글 조회</h2>
      <div className="card">
        <div className="card-header">
            <Link className="btn btn-outline-primary mx-1" to="/projectnaming/voiceofcustomer/list">게시글 목록 목록</Link>
            {
              board.processYN === "N"
              ? <Link to={`/projectnaming/voiceofcustomer/edit/${board._id}`} className="btn btn-outline-success mx-1">수정</Link>
              : null
            }
            <button onClick={()=>handleDeleteConfirm(board._id)} className="btn btn-outline-danger mx-1">삭제</button>
        </div>
        <div className="card-body">
          <b className="text-muted">번호: <p>{board.no}</p></b>
          <b className="text-muted">제목: <p>{board.title}</p></b>
          <b className="text-muted">작성자 : <p>{board.creator}</p></b>
          <b className="text-muted">작성일 : <p>{board.createdDt}</p></b>
          <div className="form-group">
                <label htmlFor="description">내용</label>
                <ReactQuill
                  style={{ height: "400px", margin: "4px" }}
                  forwardedRef={quillRef}
                  theme="snow"
                  value={board.description}
                  modules={modules}
                  formats={formats}
                  placeholder=""
                  readOnly={true}
                />
          </div>
        </div>      
      </div>
    </div>
  );
}