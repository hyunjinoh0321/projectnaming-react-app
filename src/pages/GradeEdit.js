import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

export default function GradeEdit() {
  const [id, setId] = useState(useParams().id);

  const [grade, setGrade] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    axios.get(`http://172.23.125.110:3030/projectnaming/grade/${id}`)
      .then((response) => {
        let outputData = response.data;
        setGrade(outputData.grade);
        setCode(outputData.code);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [id]);

  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();
    const newGrade = {
        grade: grade,
        code: code
    };
    axios.put(`http://172.23.125.110:3030/projectnaming/grade/${id}`, newGrade)
      .then((response) => {
        console.log("Grade edited successfully.");
        navigate("/projectnaming/grade/list");
      })
      .catch((error) => {
        console.log("Error while editing Grade:", error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-3">Grade 수정</h2>
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