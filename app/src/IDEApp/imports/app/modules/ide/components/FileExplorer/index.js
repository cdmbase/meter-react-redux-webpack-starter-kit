import React from 'react';
import ProjectHeader from './project-header';
import ProjectFiles from './project-files';
import '../../stylesheets/file-explorer/file-explorer.less';

const FileExplorer = ({job}) => {
    return (


        <div className="file-explorer" id="file-explorer" >
            <ProjectHeader />
            <ProjectFiles />
        </div>

    )
};

export default FileExplorer;