import React, { Component, PropTypes } from 'react';
import ModuleElement from './ModuleElement'

class AbstractNode extends Component {

    get status() {
        let { status, node, root } = this.props;
        return root || status[node.relativePath];
    }

    render() {
        let { node, root, pading, status, active, onToggle, onClick, onNodeDoubleClick } = this.props;
        return (
            <div className={`tree-view-node ${ root && 'root-node'}`}>
                <ModuleElement {...this.props}/>
                {node.children && (
                    <div style={{ paddingLeft: padding }} className={` children ${ !this.status && 'hidden'}`}>
                        { node.children.map(child =>
                            <AbstractNode
                            onNodeDoubleClick={onNodeDoubleClick}
                            onClick={onClick}
                            status={status}
                            active={active}
                            padding={padding}
                            node={child}
                        />)}
                    </div>
                )}
            </div>
        )
    }
}

AbstractNode.propTypes = {
    node: PropTypes.object.isRequired
}


export default AbstractNode;