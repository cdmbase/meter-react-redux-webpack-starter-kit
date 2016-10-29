import React, {Component, PropTypes} from 'react';
import {ContextMenuLayer} from 'react-contextmenu';
import {FILE_EXPLORER_CONTEXT} from '../../../menu-types';

class ModuleElement extends Component {
    get status() {
        let {status, node, root} = this.props;
        return root || status[node.relativePath];
    }

    render() {
        let {node, root, pading, status, active, onToggle, onClick, onNodeDoubleClick} = this.props;
        return (
            <div className={`tree-view-node ${ root && 'root-node'}`}>
                <div onClick={e => onClick(node) }
                     className={`name ${active === node.relativePath && 'active'}`}>
                    { !node.leaf && !!(node.children || []).length &&
                    <i style={{ fontSize: "8px", marginRight: "5px" }}
                       className={` ${this.status ? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-right" }`}
                       onClick={e => {e.stopPropagation();
                       onToggle(node);
                       }}/> }
                    <span
                        onDoubleClick={e => onNodeDoubleClick(node)}
                        data-path={node.path}
                        data-name={node.module}
                        className={`icon name ${ node.type === 'directory' ? 'icon-file-directory' : 'icon-file-text'} node`}
                    >
                        <i style={{ marginRight: "3px" }}
                           className={`glyphicon ${node.type === 'file' ? 'glyphicon-file' : 'glyphicon-folder-close' }`}/> { node.module }
                    </span>

                </div>
            </div>
        )
    }
}

ModuleElement.propTypes = {
    node: PropTypes.object.isRequired
}

export default ContextMenuLayer(FILE_EXPLORER_CONTEXT, ({ node, }) => ({...node}))(ModuleElement);