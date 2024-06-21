import React, {useRef, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import CreateVersion from './VersionCreate'; 
import VersionList from './VersionList2';

export default function VersionAdd() {
    const [Version, setVersion] = useState('');
    
    const [applyDate, setApplyDate] = useState('');
    const [versions, setVersions] = useState([]);
    const [server, setServer] = useState('');
    const [contents, setContents] = useState('');
    const [requester, setRequester] = useState('');
    const [manager, setManager] = useState("오현진");
    const [result, setResult] = useState("N");
    const [inputs, setInputs] = useState({ versionFile: '', type: '' });  
    const { versionFile, type } = inputs; 
  
    const nextId = useRef(4); 

    const navigate = useNavigate();
  
    const handleSave = (event) => {
      event.preventDefault();
      const newVersion = {
        applyDate: applyDate,
        versions: versions,
        server : server,
        contents : contents,
        requester : requester,
        manager : manager,
        result : result
      };
      axios.post("http://172.23.125.110:3030/version", newVersion)
        .then((response) => {
          console.log("Version added successfully.");
          navigate("/projectnaming/version/list");
        })
        .catch((error) => {
          console.log("Error while adding Version:", error);
        });      
    }
    const onChange = e => {    
      const { name, value } = e.target;    
      setInputs({ ...inputs, [name]: value });  
    }; 

    const onCreate = () => {    
      const version = { id: nextId.current, versionFile, type };    
          setVersions(versions.concat(version));  // concat함수를 이용해서 불변성을 지킴     
          setInputs({ versionFile: '', type: '' });    
          nextId.current += 1;  
    }; 

    const onRemove = id => {  
        setVersions(versions.filter(version => version.id !== id));  
    };

    return (
      <>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">버전처리 등록</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-primary mx-1" to="/projectnaming/version/list">버전처리 목록</Link>
          </div>
                  <div className="card-body">  
                      <form>
                          <div className="form-group">
                              <b><label >날짜</label></b>
                              <input 
                                  onChange={(event) => {setApplyDate(event.target.value)}} 
                                  value={applyDate}
                                  type="date"
                                  className="form-control"
                                  id="applyDate"
                                  name="applyDate"
                                  required>
                              </input>
                          </div> 
                          <div className="form-group">   
                              <b><label >버전처리</label></b>
                              <CreateVersion       
                                  versionFile={versionFile}        
                                  type={type}        
                                  onChange={onChange}
                                  onCreate={onCreate}      
                              />
                              <b><label >등록 된 리스트</label></b>      
                              <VersionList versions={versions} onRemove={onRemove} 
                              />
                          </div> 
                          <div className="form-group">
                              <b><label >서버</label></b>
                              <input 
                                  onChange={(event) => {setServer(event.target.value)}} 
                                  value={server}
                                  type="text"
                                  className="form-control"
                                  id="server"
                                  name="server"
                                  required>
                              </input>
                          </div> 
                          <div className="form-group">
                              <b><label >반영내용</label></b>
                              <input 
                                  onChange={(event) => {setContents(event.target.value)}} 
                                  value={contents}
                                  type="text"
                                  className="form-control"
                                  id="contents"
                                  name="contents"
                                  required>
                              </input>
                          </div> 
                          <div className="form-group">
                              <b><label >담당자</label></b>
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
                              <b><label >관리자</label></b>
                              <input 
                                  onChange={(event) => {setManager(event.target.value)}} 
                                  value={manager}
                                  type="text"
                                  className="form-control"
                                  id="manager"
                                  name="manager"
                                  disabled>
                              </input>
                          </div>
                          <div className="form-group">
                              <b><label >결과</label></b>
                              <input 
                                  onChange={(event) => {setResult(event.target.value)}} 
                                  value={result}
                                  type="text"
                                  className="form-control"
                                  id="result"
                                  name="result"
                                  disabled>
                              </input>
                          </div>
                          <button onClick={handleSave} type="button" className="btn btn-outline-primary mt-3">
                              저장
                          </button>                               
                      </form>    
                  </div>  
              </div>         
      </div>          
      </> 
    );
  }