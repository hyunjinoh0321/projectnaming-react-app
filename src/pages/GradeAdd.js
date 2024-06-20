import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function GradeAdd() {
    const [grade, setGrade] = useState('');
    const [code, setCode] = useState('');
  
    const navigate = useNavigate();
  
    const handleSave = (event) => {
      event.preventDefault();
      const newGrade = {
        grade: grade,
        code: code
      };
      axios.post("http://172.23.125.110:3030/projectnaming/grade", newGrade)
        .then((response) => {
          console.log("Grade added successfully.");
          navigate("/projectnaming/grade/list");
        })
        .catch((error) => {
          console.log("Error while adding Grade:", error);
        });      
    }
  
    return (
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Grade 등록</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-primary mx-1" to="/projectnaming/grade/list">Grade 목록</Link>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="grade">등급</label>
                <input 
                  onChange={(event) => {setGrade(event.target.value)}}
                  value={grade} 
                  type="text" 
                  className="form-control" 
                  id="grade" 
                  name="grade" 
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="code">코드</label>
                <input 
                  onChange={(event) => {setCode(event.target.value)}} 
                  value={code}
                  type="text"
                  className="form-control"
                  id="code"
                  name="code"
                  required>
                </input>
              </div>
              <button onClick={handleSave} type="button" className="btn btn-outline-primary mt-3">
                              저장
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }