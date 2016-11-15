import  ProjectHeader from './ProjectHeader'
import  ProjectFiles from './ProjectFiles'


const FileExplorer = ({opened, file, fs, tree, workspaceId}) => {

    let actions = { file, fs };

    return (
        <div className="file-explorer" id="file-explorer">
            <ProjectHeader />
            <ProjectFiles opened={opened} actions={actions} tree={tree} workspaceId={workspaceId}/>
        </div>

    )
}

export default FileExplorer;