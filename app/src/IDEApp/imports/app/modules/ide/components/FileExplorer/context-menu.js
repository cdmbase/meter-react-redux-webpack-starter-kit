import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect as ReduxConnect } from 'react-redux';
import { ContextMenu as Context, MenuItem, connect } from 'react-contextmenu';
import { FILE_EXPLORER_CONTEXT, TYPE_DIR, TYPE_FILE } from '../../menu-types';
import { TARGET_DIR, TARGET_FILE } from '../../action-types';
import { tasks } from '../../actions/boxes-actions';
import randomstring from 'randomstring';

import '../../stylesheets/context-menu.less';

const ACT_REMOVE = 'ACT_REMOVE';
const ACT_RENAME = 'ACT_RENAME';
const ACT_DOWNLOAD = 'ACT_DOWNLOAD';
const ACT_NEW_FOLDER = 'ACT_NEW_FOLDER';
const ACT_NEW_FILE = 'ACT_NEW_FILE';
const ACT_OPEN = 'ACT_OPEN';

class ContextMenu extends Component {

    constructor(...options) {
        super(...options);

        this.state = {};

        this.click = this.click.bind(this);
    }

    click(event, module) {
        const { act, path, fileId } = module;
        const { actions } = this.props;
        const { onAction } = this.props;
        const id = randomstring.generate();
        onAction && onAction(id, module);
        switch (act) {
            case ACT_OPEN:
                break;
            case ACT_DOWNLOAD:
                break;
            case ACT_NEW_FILE:
                actions.create(id, { module, target: TARGET_FILE });
                break;
            case ACT_NEW_FOLDER:
                actions.create(id, { module, target: TARGET_DIR });
                break;
            case ACT_REMOVE:
                actions.remove(id, { module });
                break;
            case ACT_RENAME:
                actions.remove(id, { module });
                break;
        }
    }

    render() {
        const { module, type = TYPE_FILE } = this.props.item;
        return (
            <Context identifier={FILE_EXPLORER_CONTEXT}>
                { type != TYPE_DIR ? [
                    <MenuItem key={Math.random()} onClick={this.click} data={{module, act: ACT_OPEN}}>Open</MenuItem>,
                    <MenuItem key={Math.random()} onClick={this.click}
                              data={{module, act: ACT_DOWNLOAD}}>Download</MenuItem>
                ] : null}
                {type == TYPE_DIR ? [
                    <MenuItem key={Math.random()} onClick={this.click} data={{module, act: ACT_NEW_FOLDER}}>New
                        Folder</MenuItem>,
                    <MenuItem key={Math.random()} onClick={this.click} data={{module, act: ACT_NEW_FILE}}>New
                        File</MenuItem>
                ] : null}
                <MenuItem key={Math.random()} onClick={this.click} data={{module, act: ACT_RENAME}}>Rename</MenuItem>
                <MenuItem key={Math.random()} onClick={this.click} data={{module, act: ACT_REMOVE}}>Remove</MenuItem>
            </Context>
        )
    }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(tasks, dispatch)});

export default ReduxConnect(mapStateToProps, mapDispatchToProps)(connect(ContextMenu));