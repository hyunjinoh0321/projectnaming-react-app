import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function WorkAdd() {
    const [work, setWork] = useState('');
    const [workCode, setWorkCode] = useState('');
  
    const navigate = useNavigate();
  
    const handleSave = (event) => {
      event.preventDefault();
      const newWork = {
        work: work,
        workCode: workCode
      };
      axios.post("http://172.23.125.110:3030/projectnaming/work", newWork)
        .then((response) => {
          console.log("Work added successfully.");
          navigate("/projectnaming/work/list");
        })
        .catch((error) => {
          console.log("Error while adding Work:", error);
        });      
    }
  
    return (
      <div className="container">
        <h2 className="text-center mt-5 mb-3">업무 등록</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-primary mx-1" to="/projectnaming/work/list">업무 목록</Link>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="work">업무</label>
                <input 
                  onChange={(event) => {setWork(event.target.value)}}
                  value={work} 
                  type="text" 
                  className="form-control" 
                  id="work" 
                  name="work" 
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="workCode">업무</label>
                <input 
                  onChange={(event) => {setWorkCode(event.target.value)}} 
                  value={workCode}
                  type="text"
                  className="form-control"
                  id="workCode"
                  name="workCode"
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