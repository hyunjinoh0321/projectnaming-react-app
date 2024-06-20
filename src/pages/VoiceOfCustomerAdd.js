import React, {useState, useRef, any} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function VoiceOfCustomerAdd() {
    const [no, setNo] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [creator, setCreator] = useState('');

    const navigate = useNavigate();

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
    
    const handleSave = (event) => {
      event.preventDefault();

      const newVoiceOfCustomer = {
        no: no,
        title: title,
        description: description,
        creator: creator
      };
      axios.post("http://172.23.125.110:3030/projectnaming/board", newVoiceOfCustomer)
        .then((response) => {
          console.log("VoiceOfCustomer added successfully.");
          navigate("/projectnaming/voiceofcustomer/list");
        })
        .catch((error) => {
          console.log("Error while adding VoiceOfCustomer:", error);
        });      
    }
  
    return (
      <div className="container">
        <h2 className="text-center mt-5 mb-3">고객의소리 등록</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-primary mx-1" to="/projectnaming/voiceofcustomer/list">고객의소리 목록</Link>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="no">번호</label>
                <input 
                  value="자동으로 생성"
                  type="text"
                  className="form-control"
                  id="no"
                  name="no"
                  disabled>
                </input>
              </div>           
              <div className="form-group">
                <label htmlFor="title">제목</label>
                <input 
                  onChange={(event) => {setTitle(event.target.value)}} 
                  value={title}
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="creator">작성자</label>
                <input 
                  onChange={(event) => {setCreator(event.target.value)}} 
                  value={creator}
                  type="text"
                  className="form-control"
                  id="creator"
                  name="creator"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="description">내용</label>
                <ReactQuill
                  style={{ height: "400px", margin: "4px" }}
                  forwardedRef={quillRef}
                  theme="snow"
                  value={description}
                  modules={modules}
                  formats={formats}
                  onChange={setDescription}
                  placeholder="내용을 입력하세요."
                />
              </div>
              <div className="mt-5 mb-3">
              <button onClick={handleSave} type="button" className="btn btn-outline-primary mt-3">
                              저장
              </button>    
              </div>                       
            </form>
          </div>
        </div>
      </div>
    );
  }