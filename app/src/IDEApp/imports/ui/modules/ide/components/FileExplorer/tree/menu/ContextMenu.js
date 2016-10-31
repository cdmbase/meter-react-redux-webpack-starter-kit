import React, { Component } from 'react';
import logger from 'cdm-logger';
import { ContextMenu as Context, MenuItem, connect } from 'react-contextmenu'
import { FILE_EXPLORER_CONTEXT, TYPE_DIR, TYPE_FILE } from '../../../../menu-types';
import { TARGET_DIR, TARGET_FILE } from '../../../../action-types';
import { JOB_ACTION_CREATION, JOB_ACTION_RENAME, JOB_ACTION_REMOVE } from '../../../../action-types';
import { MODULE_MODAL, REMOVE_MODAL, SHOW_CONTEXT_MODAL } from '../../../../action-types';
import Emitter from '../../Emitter';

const ACT_REMOVE = 'ACT_REMOVE';
const ACT_RENAME = 'ACT_RENAME';
const ACT_DOWNLOAD = 'ACT_DOWNLOAD';
const ACT_NEW_FOLDER = 'ACT_NEW_FOLDER';
const ACT_NEW_FILE = 'ACT_NEW_FILE';
const ACT_OPEN = 'ACT_OPEN';


export default class ContextMenu extends Component {

    constructor(...options) {
        super(...options);

        this.state = {
            modal: false
        };

        this.click = this.click.bind(this);
    }

    click(event, module) {
        const { act } = module;
        logger.debug("[ContextMenu][Click]", { module, act });
        switch(act) {
            case ACT_OPEN:

                break;
            case ACT_DOWNLOAD:

                break;
            case ACT_NEW_FILE:
                this.modal(MODULE_MODAL, { action: JOB_ACTION_CREATION, module, target: TARGET_FILE });
                break;
            case ACT_NEW_FOLDER:
                this.modal(MODULE_MODAL, { action: JOB_ACTION_CREATION, module, target: TARGET_DIR });
                break;
            case ACT_REMOVE:
                this.modal(REMOVE_MODAL, { action: JOB_ACTION_REMOVE, module, target: module.type });
                break;
            case ACT_RENAME:
                this.modal(MODULE_MODAL, { action: JOB_ACTION_RENAME, module });
                break;

        }
    }

    modal(type, options) {
        logger.debug("[ContextMenu]",  { type, options } )
        Emitter.emit(SHOW_CONTEXT_MODAL, { type, options });
    }

    render() {
        let { item = {} } = this.props;
        let { type } = item;
        logger.debug("[ContextMenu]",  { props: this.props, item: item.module } )
        return (
            !!item &&
                <Context identifier={FILE_EXPLORER_CONTEXT}>
                    { type != TYPE_DIR ? [
                        <MenuItem key={Math.random()} onClick={this.click} data={{module: item, act: ACT_OPEN}}>Open</MenuItem>,
                        <MenuItem key={Math.random()} onClick={this.click} data={{module: item, act: ACT_DOWNLOAD}}>Download</MenuItem>
                    ]: null}
                    { type === TYPE_DIR ? [
                        <MenuItem key={Math.random()} onClick={this.click} data={{module: item, act: ACT_NEW_FOLDER}}>New Folder</MenuItem>,
                        <MenuItem key={Math.random()} onClick={this.clicl} data={{module: item, act: ACT_NEW_FILE}}>New File</MenuItem>
                    ]: null}
                    <MenuItem key={Math.random()} onClick={this.click} data={{module: item, act: ACT_RENAME, target: type === TYPE_FILE ? 'file' : 'dir'}}>Rename</MenuItem>
                    <MenuItem key={Math.random()} onClick={this.click} data={{module: item, act: ACT_REMOVE}}>Delete</MenuItem>
                </Context>
        )
    }
}