import React, { Component, PropTypes } from 'react'
import ContextMenu from './tree/menu/ContextMenu'
import Tree from './tree/Tree'
import Emitter from './Emitter';
import { SHOW_CONTEXT_MODAL, MODULE_MODAL, REMOVE_MODAL } from '../../action-types';
import { FILE_EXPLORER_CONTEXT } from '../../menu-types';
import ModuleModal from './modals/Module'
import RemoveModule from './modals/ModuleRemove'


export default class TreeView extends Component {
    constructor(){
        super(...arguments);

        this.state = {
            modal: false
        };

        this.openFile = this.openFile.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        this.setState({
            modal: false
        })
    }

    openFile(node) {
        if(node.type === 'file') {
            let {workspaceId} = this.props;
            if(this.props.opened.findIndex(el => el.relativePath === node.relativePath) === -1) {
                this.props.actions.fs.cat(workspaceId, node.relativePath);
                this.props.actions.file.open(workspaceId, node.relativePath);
            }
            this.props.actions.file.activate(workspaceId, node.relativePath);
        }
    }

    componentDidMount() {
        Emitter.on(SHOW_CONTEXT_MODAL, ({ options, type }) => {
            console.log("[LOG][TreeView]", { options, type });
            this.setState({ modal: { type, options}})
        })
    }

    render() {
        let { hidden, tree } = this.props;
        let { modal } = this.state
        return (
            <div onFocus={e => console.log("Focussed")} tabIndex={-1} className={`sidebar-tree-view ${ hidden && 'hidden'}`}>
                <Tree
                    onNodeDoubleClick={this.openFile}
                    tree={ tree || {} }
                    padding={15}
                    />
                <ContextMenu identifier={FILE_EXPLORER_CONTEXT} />
                { !!modal ? [
                    <ModuleModal onHide={this.close} options={modal.options} show={ modal.type === MODULE_MODAL } />,
                    <RemoveModule onHide={this.close} options={modal.options} show={modal.type === REMOVE_MODAL}/>
                ] : null }
            </div>
        )
    }
}

TreeView.propTypes = {
    tree: PropTypes.object.isRequired,
    opened: PropTypes.array.isRequired,
    workspaceId: PropTypes.string.isRequired
}