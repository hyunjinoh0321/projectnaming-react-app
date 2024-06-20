import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function MaratonAdd() {
    const [Maraton, setMaraton] = useState('');
    
    const [name, setName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventName, setEventName] = useState('');
    const [type, setType] = useState('');
    const [record, setRecord] = useState('');
  
    const navigate = useNavigate();
  
    const handleSave = (event) => {
      event.preventDefault();
      const newWork = {
        name: name,
        eventDate: eventDate,
        eventName:eventName,
        type:type,
        record:record
      };
      axios.post("http://172.23.125.110:3030/maraton", newWork)
        .then((response) => {
          console.log("Maraton added successfully.");
          navigate("/projectnaming/maraton/list");
        })
        .catch((error) => {
          console.log("Error while adding Maraton:", error);
        });      
    }
  
    return (
      <div className="container">
        <h2 className="text-center mt-5 mb-3">마라톤 기록 등록</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-primary mx-1" to="/projectnaming/maraton">마라톤 기록 목록</Link>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">참가자</label>
                <input 
                  onChange={(event) => {setName(event.target.value)}}
                  value={name} 
                  type="text" 
                  className="form-control" 
                  id="name" 
                  name="name" 
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="eventDate">대회일</label>
                <input 
                  onChange={(event) => {setEventDate(event.target.value)}} 
                  value={eventDate}
                  type="text"
                  className="form-control"
                  id="eventDate"
                  name="eventDate"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="eventName">대회명</label>
                <input 
                  onChange={(event) => {setEventName(event.target.value)}} 
                  value={eventName}
                  type="text"
                  className="form-control"
                  id="eventName"
                  name="eventName"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="type">참가종목</label>
                <input 
                  onChange={(event) => {setType(event.target.value)}} 
                  value={type}
                  type="text"
                  className="form-control"
                  id="type"
                  name="type"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="record">기록</label>
                <input 
                  onChange={(event) => {setRecord(event.target.value)}} 
                  value={record}
                  type="text"
                  className="form-control"
                  id="record"
                  name="record"
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