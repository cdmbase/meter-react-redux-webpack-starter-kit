import React from 'react';
import TreeView from './TreeView';
const ProjectFiles = (props) => {

    return (
        <div className="project-files workspace-container">
           <TreeView {...props} />
        </div>
    )
};

export default ProjectFiles;