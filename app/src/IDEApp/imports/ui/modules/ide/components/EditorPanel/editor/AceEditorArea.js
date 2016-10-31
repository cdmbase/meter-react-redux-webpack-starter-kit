import React, { Component, PropTypes } from 'react'
import AceEditor from 'react-ace'
import FileConflict from '../modals/FileConflict';
import logger from 'cdm-logger';

require('brace/ext/statusbar');
require('brace/ext/emmet');
require('brace/ext/language_tools');
require('brace/mode/javascript');
require('brace/theme/twilight');
require('brace/keybinding/vim');

export default class AceEditorArea extends Component {

    constructor() {
        super(...arguments)

        this.state = {
            files: {},
            modal: false
        };
    }

    componentWillReceiveProps({ contents }) {
        logger.debug("Checking content ", contents);
        let { files } = this.state;
        logger.debug("Checking files", files);
        Object.keys(contents || {}).forEach(fileId => {
            logger.debug(fileId);
            if(files.hasOwnProperty(fileId) && files[fileId] != contents[fileId]){
                this.setState({ modal: { type: 'conflict', id: fileId, content: { new: contents[fileId], old: files[fileId]}}})
            } else {
                this.setState({
                    files: { ...files, [fileId]: contents[fileId]}
                })
                logger.debug("modified files ", files);
            }
        })
    }

    componentWillUpdate(props, state) {

    }

    render() {
        const { files, modal } = this.state;
        const { selected, contents, actions, workspaceId } = this.props;
        let file = files[selected];
        logger.debug("In render method, checking contents ", contents);

        return (
            <div className="editor">
                <AceEditor
                    ref="editor"
                    mode={'javascript'}
                    theme="twilight"
                    enableBasicAutocompletion={true}
                    enableLiveAutocompletion={true}
                    name={`editor-${selected}`}
                    height="100%"
                    setOptions={{
                        tabSize: 4,
                        showGutter:true
                    }}
                    commands={[
                        {
                         name: 'saveFile',
                         bindKey: {
                           win: 'Ctrl-S', mac: 'Command-S',
                           sender: 'editor|cli'
                         },
                         exec: () => actions.update(workspaceId, selected, this.state.files[selected])
                        }
                    ]}
                    keyboardHandler='vim'
                    value={file || " "}
                    onChange={content => this.setState({ files: { ...this.state.files || {}, [selected]: content }})}
                    width="100%"
                    />

                { modal && modal.type === 'conflict' && modal.id === selected && <FileConflict
                    onHide={ e => this.setState({ modal: false })}
                    onLoad = { content => this.setState({ files: { ...this.state.files || {}, [selected]: content }})}
                    show={true}
                    content={modal.content}
                    /> }
                </div>
        )
    }
}

AceEditorArea.propTypes = {
    contents: PropTypes.object,
    workspaceId: PropTypes.string.isRequired
}