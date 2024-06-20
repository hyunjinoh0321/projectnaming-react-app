import React, { useRef, useState } from 'react';
import CreateVersion from './VersionCreate'; 
import VersionList from './VersionList2';

function VersionTest() 
{  
    const [inputs, setInputs] = useState({ versionfile: '', type: '' });  
    const [date, setDate] = useState();
    const [server, setServer] = useState();
    const [contents, setContents] = useState();
    const [owner, setOwner] = useState();
    const [manager, setManager] = useState('오현진');
    const [result, setResult] = useState('N');
    const { versionfile, type } = inputs;  
    const [versions, setVersions] = useState([]);   

    const nextId = useRef(4); 

    const onChange = e => {    
        const { name, value } = e.target;    
        setInputs({ ...inputs, [name]: value });  
    };  

    const onCreate = () => {    
        const version = { id: nextId.current, versionfile, type };    
            setVersions(versions.concat(version));  // concat함수를 이용해서 불변성을 지킴     
            setInputs({ versionfile: '', type: '' });    
            nextId.current += 1;  
    }; 

    const onRemove = id => {  
        setVersions(versions.filter(version => version.id !== id));  
    };
    
    return (    
        <>
        <div className="container">   
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-center mt-1 mb-1">버전처리 등록</h2>
                    </div>
                    <div className="card-body">  
                        <form>
                            <div className="form-group">
                                <b><label >날짜</label></b>
                                <input 
                                    onChange={(event) => {setDate(event.target.value)}} 
                                    value={date}
                                    type="text"
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    required>
                                </input>
                            </div> 
                            <div className="form-group">   
                                <b><label >버전처리</label></b>
                                <CreateVersion       
                                    username={versionfile}        
                                    email={type}        
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
                                    onChange={(event) => {setOwner(event.target.value)}} 
                                    value={owner}
                                    type="text"
                                    className="form-control"
                                    id="owner"
                                    name="owner"
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
                        </form>    
                    </div>  
                </div>         
        </div>          
        </>  
     );
} 

export default VersionTest;
