import React, { Component } from 'react';
import { ContextMenuLayer } from 'react-contextmenu';
import classNames from 'classnames';
import { FILE_EXPLORER_CONTEXT } from '../../../menu-types';


class TreeNode extends Component {
    constructor(...options) {
        super(...options);
        this.state = {
            active: this.props.active
        }
    }

    componentWillReceiveProps({active}) {
        this.setState({
            active
        })
    }

    onClickNode(node) {
        return e => {
            const { onClick } = this.props;
            onClick && onClick(node);
        }
    }

    getClassName(node) {
        return classNames(
            'icon', 'name', 'node', {
                'icon-file-directory': node.type == 'directory',
                'icon-file-text': node.type != 'directory',
                'is-active': this.state.active,
            })
    }


    render() {
        let { node } = this.props;
        return (
            <span
                data-path={node.path}
                data-name={node.module}
                className={this.getClassName(node)}
                onClick={this.onClickNode(node)}
            >
                {node.module}
                </span>
        )
    }
}

export default ContextMenuLayer(FILE_EXPLORER_CONTEXT, ({ node }) => ({...node}))(TreeNode);