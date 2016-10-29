import React, {Component, PropTypes} from 'react';
import AbstractNode from './AbstractNode'


export default class Tree extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            status: {},
            active: false
        }
    }

    render() {
        let {tree, padding, onNodeClick, onNodeToggle, onNodeDoubleClick} = this.props;
        let {status, active} = this.state
        return (
            <div className="tree-view">
                <AbstractNode
                    onNodeDoubleClick={onNodeDoubleClick}
                    onClick={node => {
                      this.setState({ active: node.relativePath });
                      onNodeClick && onNodeClick(node);
                    }}
                    status={status}
                    active={active}
                    onToggle={node => {
                        this.setState({ status: {...status, [node.relativePath]: !status[node.relativepath] } })
                        onNodeToggle && onNodeToggle(node);
                    }}
                    node={tree}
                    padding={padding}
                    root/>
            </div>
        )
    }
}

Tree.propTypes = {
    tree: PropTypes.object.isRequired,
}