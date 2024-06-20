import React from 'react'; 

function CreateVersion({ versionfile, type, onChange, onCreate }) {  
    return (    
    <div className="card-body">
        <div class="input-group mb-1" >    
            <input        
                name="versionfile"
                placeholder="Version Name"
                onChange={onChange}    
                value={versionfile}
                class="form-control"
            />            
            <input        
                name="type"
                placeholder="Type"
                onChange={onChange}
                value={type}
                class="form-control"
            />
            <button onClick={onCreate} className="btn btn-outline-primary">등록</button>  
        </div>   
        </div>  
    );
} 

export default CreateVersion;