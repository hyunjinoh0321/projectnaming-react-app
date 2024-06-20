import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import { deleteBoard, updateProcessYN  } from './api';  // delete 공통 함수 : api.js
 
export default function VoiceOfCustomerList() {
  const  [voiceOfCusotmerData, setVoiceOfCustomerData] = useState([]);
 
  useEffect(() => {
    fetchBoardList()
  }, []);
  
  const makeDate = (date) => {
    console.log(date);
    return date.substr(0,10); 
  }

  const fetchBoardList = () => {
    axios.get('http://172.23.125.110:3030/projectnaming/board')
      .then((response) => {
        setVoiceOfCustomerData(response.data);
      })
      .catch((error) => {
        console.log("Error while fetching Boards:", error);
      });
  }
  
  const handleDeleteConfirm = (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      deleteBoard(id)            // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Board deleted successfully.");
          fetchBoardList();
        })
        .catch((error) => {
          console.log("Error while deleting book:", error);
        });
    }
  }

  const handleUpdateProcessYN = (id) => {
    if (window.confirm("완료처리 하시겠습니까아?")) {
      updateProcessYN(id)            // delete 공통 함수 호출 : api.js
        .then(() => {
          console.log("Board deleted successfully.");
          fetchBoardList();
        })
        .catch((error) => {
          console.log("Error while deleting book:", error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mt-1 mb-3"><font size="5" color="red" face="궁서체"><b>고객의 소리</b></font></h2>
      <p className="text-center mt-1 mb-3"><font size="5" color="red" face="궁서체" ><b>고객의 소리를 귀담아 듣겠습니다.</b></font></p>
      <p className="text-center mt-1 mb-3"><font size="5" color="red" face="궁서체" ><b>마음것 작성 하세요</b></font></p>
      <div className="card" >
        <div className="card-header">
          <Link className="btn btn-outline-primary mx-1" to="/projectnaming/voiceofcustomer/add">고객의소리 등록</Link>
        </div>
        <div className="card-body" size="">
          <table className="table table-bordered" >
            <thead>
              <tr >
                <th width="60px"><center>번호</center></th>
                <th width="450px"><center>제목</center></th>
                <th width="60px"><center>작성자</center></th>
                <th width="120px"><center>작성일</center></th>
                <th width="60px"><center>완료</center></th>
                <th width="250px">Action</th>
              </tr>
            </thead>
            <tbody>           
              {voiceOfCusotmerData.map((voiceofcusotmer, key)=>{
                return (
                  <tr key={key}>
                    <td align='center'>{voiceofcusotmer.no}</td>
                    <td ><Link to={`/projectnaming/voiceofcustomer/view/${voiceofcusotmer._id}`}>{voiceofcusotmer.title}</Link></td>
                    <td align='center'>{voiceofcusotmer.creator}</td>
                    <td align='center'>{makeDate(voiceofcusotmer.createdDt)}</td>
                    <td align='center'>{voiceofcusotmer.processYN}</td>
                    <td align='center'>
                      <Link to={`/projectnaming/voiceofcustomer/view/${voiceofcusotmer._id}`} className="btn btn-outline-info mx-1">조회</Link>
                      {
                        voiceofcusotmer.processYN === "N"
                        ? <Link to={`/projectnaming/voiceofcustomer/edit/${voiceofcusotmer._id}`} className="btn btn-outline-success mx-1">수정</Link>
                        : null
                      }
                      <button onClick={()=>handleDeleteConfirm(voiceofcusotmer._id)} className="btn btn-outline-danger mx-1">삭제</button>
                      {
                        voiceofcusotmer.processYN === "N"
                        ? <button onClick={()=>handleUpdateProcessYN(voiceofcusotmer._id)} className="btn btn-outline-danger mx-1">완료</button>
                        : null
                      }
                      
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}