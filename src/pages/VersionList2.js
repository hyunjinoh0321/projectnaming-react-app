import React from 'react'; 

function Version({ version, onRemove }) {  
    return (    
        <div className="form-group">      
            <b>{version.versionfile}</b> 
            <span>({version.type})</span>      
            <button onClick={() => onRemove(version.id)}>삭제</button> 
        </div>  
    );
} 

function VersionList({ versions, onRemove }) {  
    return (    
    <div className="form-group">      
        {versions.map(
            version => (        
                <Version version={version} key={version.id} onRemove={onRemove} /> 
                )
            )
        }    
    </div>  
    );
} 

export default VersionList;