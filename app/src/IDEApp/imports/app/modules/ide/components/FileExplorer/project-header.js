import React from 'react';
import UtilityBar from '../../../../components/utility-bar';
import ProjectButtons from './project-buttons';

const ProjectHeader = () => {

    return (
        <div className="project-header">
            <UtilityBar> </UtilityBar>
            <UtilityBar><ProjectButtons /></UtilityBar>
        </div>
    )
};

export default ProjectHeader;