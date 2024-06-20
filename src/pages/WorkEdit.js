import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

export default function WorkEdit() {
  const [id, setId] = useState(useParams().id);

  const [work, setWork] = useState('');
  const [workCode, setWorkCode] = useState('');

  useEffect(() => {
    axios.get(`http://172.23.125.110:3030/projectnaming/work/${id}`)
      .then((response) => {
        let outputData = response.data;
        setWork(outputData.work);
        setWorkCode(outputData.workCode);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [id]);

  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();
    const newWork = {
        work: work,
        workCode: workCode
    };
    axios.put(`http://172.23.125.110:3030/projectnaming/work/${id}`, newWork)
      .then((response) => {
        console.log("Work edited successfully.");
        navigate("/projectnaming/work/list");
      })
      .catch((error) => {
        console.log("Error while editing Work:", error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-3">업무 수정</h2>
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
              <label htmlFor="workCode">업무코드</label>
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