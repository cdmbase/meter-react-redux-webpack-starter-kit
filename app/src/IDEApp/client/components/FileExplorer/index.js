import React from 'react';
import ProjectHeader from './project-header';
import ProjectFiles from './project-files';


const FileExplorer = () => {

    return (
        <div className="file-explorer" id="file-explorer" style={{width: "406px"}}>
            <ProjectHeader />
            <ProjectFiles />
        </div>
    )
};


export default FileExplorer;