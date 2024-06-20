import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

import { SelectWorkBox, SelectGradeBox} from "../component/selectbox"

export default function RuleEdit() {
  const [id, setId] = useState(useParams().id);

  const [grade, setGrade] = useState('');
  const [workCode, setWorkCode] = useState('');
  const [no, setNo] = useState('');
  const [title, setTitle] = useState('');
  const [expectStartDate, setExpectStartDate] = useState('');
  const [expectEndDate, setExpectEndDate] = useState('');
  const [requestDate, setRequestDate] = useState('');
  const [requestTeam, setRequestTeam] = useState('');
  const [requester, setRequester] = useState('');
  const [writer, setWriter] = useState('');
  const [projectName, setProjectName] = useState('');
  const [outputs, setOutputs] = useState('');

  const [allGrades, setAllGrades] = useState([]);
  const [allWorks, setAllWorks] = useState([]);

  useEffect(() => {
    axios.get(`http://172.23.125.110:3030/projectnaming/rule/${id}`)
      .then((response) => {
        let outputData = response.data;

        let expectStartDate = outputData.expectStartDate.replace(/(\d{4})(\d{2})/g, '$1-$2');
        let expectEndDate = outputData.expectEndDate.replace(/(\d{4})(\d{2})/g, '$1-$2');
        let requestDate = outputData.requestDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');


        setGrade(outputData.grade);
        setWorkCode(outputData.workCode);
        setNo(outputData.no);
        setTitle(outputData.title);
        setExpectStartDate(expectStartDate);
        setExpectEndDate(expectEndDate);
        setRequestDate(requestDate);
        setRequestTeam(outputData.requestTeam);
        setRequester(outputData.requester);
        setWriter(outputData.writer);
        setProjectName(outputData.projectName);
        setOutputs(outputData.outputs);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [id]);

  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();
    const newRule = {
      grade: grade,
      workCode: workCode,
      no: no,
      title: title,
      expectStartDate: expectStartDate.replace("-",""),
      expectEndDate: expectEndDate.replace("-",""),
      requestDate: requestDate.replace(/-/g,""),
      requestTeam: requestTeam,
      requester: requester,
      writer: writer,
      projectName: projectName,
      outputs: outputs
    };
    axios.put(`http://172.23.125.110:3030/projectnaming/rule/${id}`, newRule)
      .then((response) => {
        console.log("Rule edited successfully.");
        navigate("/projectnaming/rule/list");
      })
      .catch((error) => {
        console.log("Error while editing Rule:", error);
      });
  }

  const handleGradeChange = (e) => {
    // event handler
    console.log("Grade Change : " + e.target.value);
    setGrade(e.target.value)
  };

  const handleWorkChange = (e) => {
    // event handler
    console.log("WorkCode Change : " + e.target.value);
    setWorkCode(e.target.value)
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-3">프로젝트 네이밍 수정</h2>
      <div className="card">
        <div className="card-header">
          <Link className="btn btn-outline-primary mx-1" to="/projectnaming/rule/list">프로젝트 네이밍 목록</Link>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
                <label htmlFor="grade">위험등급</label>
                <SelectGradeBox handle={handleGradeChange} options={allGrades} defaultValue={grade}></SelectGradeBox>
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
                <label htmlFor="workCode">업무코드</label>
                <SelectWorkBox handle={handleWorkChange} options={allWorks} defaultValue={workCode}></SelectWorkBox>
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
              <div className="form-group">
                <label htmlFor="no">일련번호 : 수정불가</label>
                <input 
                  onChange={(event) => {setNo(event.target.value)}} 
                  value={no}
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
                <label htmlFor="expectStartDate">예상시작</label>
                <input 
                  onChange={(event) => {setExpectStartDate(event.target.value)}} 
                  value={expectStartDate}
                  type="month"
                  className="form-control"
                  id="expectStartDate"
                  name="expectStartDate"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="expectEndDate">예상종료</label>
                <input 
                  onChange={(event) => {setExpectEndDate(event.target.value)}} 
                  value={expectEndDate}
                  type="month"
                  className="form-control"
                  id="expectEndDate"
                  name="expectEndDate"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="requestDate">요청일</label>
                <input 
                  onChange={(event) => {setRequestDate(event.target.value)}} 
                  value={requestDate}
                  type="date"
                  className="form-control"
                  id="requestDate"
                  name="requestDate"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="requestTeam">요청팀</label>
                <input 
                  onChange={(event) => {setRequestTeam(event.target.value)}} 
                  value={requestTeam}
                  type="text"
                  className="form-control"
                  id="requestTeam"
                  name="requestTeam"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="requester">요청자</label>
                <input 
                  onChange={(event) => {setRequester(event.target.value)}} 
                  value={requester}
                  type="text"
                  className="form-control"
                  id="requester"
                  name="requester"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="writer">작성자</label>
                <input 
                  onChange={(event) => {setWriter(event.target.value)}} 
                  value={writer}
                  type="text"
                  className="form-control"
                  id="writer"
                  name="writer"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="projectName">프로젝트 네이밍 : 자동으로 생성</label>
                <input 
                  value={projectName}
                  type="text"
                  className="form-control"
                  id="projectName"
                  name="projectName"
                  disabled>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="outputs">산출물</label>
                <input 
                  onChange={(event) => {setOutputs(event.target.value)}} 
                  value={outputs}
                  type="text"
                  className="form-control"
                  id="outputs"
                  name="outputs"
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