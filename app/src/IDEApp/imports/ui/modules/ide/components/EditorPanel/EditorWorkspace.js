import React, {Component, PropTypes } from 'react';
import ControlsBar from '../../../../components/ControlsBar';
import AceEditorArea from './editor/AceEditorArea';


export default class EditorWorkspace extends Component {

    render() {

        return (
            <div className="editor-workspace">
                <ControlsBar />
                <AceEditorArea {...this.props} />
            </div>
        )
    }
}