import TabsBar from './TabsBar';
import EditorWorkspace from './EditorWorkspace'
import Tips from '../Tips';


const EditorPanel = ({active, opened, contents, file, fs}) => {
    let actions = { file, fs };

    return (
        active ?  (<div className="editor-panel raised">
            <EditorWorkspace actions={fs} contents={contents} selected={active} />
            <TabsBar actions={file} active={active} opened={opened} />
        </div>) : <Tips/>
    )
};

export default EditorPanel;