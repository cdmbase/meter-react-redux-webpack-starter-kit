import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { file } from '../../actions/boxes-actions';

class TabsBar extends Component {
    close(file) {
        return e => {
            e.stopPropagation();
            let { box }  = this.context;
            this.props.file.close(box._id, file.relativePath);
        }
    }

    activate(file) {
        return e => {
            e.stopPropagation();
            let { box} = this.context;
            this.props.file.activate(box._id, file.relativePath);
        }
    }

    render() {
        let { opened = {}, editor = {}, active = false } = this.props;

        return (
            <ul className="top-editor-toolbar list-unstyled">
                {opened.map((file, index) => (
                    <OverlayTrigger key={index} placement="top" trigger={['focus', 'hover']}
                                    overlay={<Tooltip id={`file-path-${file.relativePath}`}>{file.relativePath}</Tooltip>}>
                        <li onClick={this.activate(file)}
                            className={`toolbar-opened-file ${file.relativePath === active && 'active'}`}>
                            <span className="ftab-element name">{file.module}</span>
                            <span onClick={this.close(file)} className="ftab-element close-btn">&times;</span>
                        </li>
                    </OverlayTrigger>
                ))}
            </ul>);
    }


}

TabsBar.contextTypes = {box: React.PropTypes.object};

const mapStateToProps = ({ boxes: { list, files, selected, editor } }) => ({
    active: (editor[selected] || {}).active,
    opened: ((editor[selected] || {}).opened || []).map(id => (files[selected] || {})[id] || false).filter(file => !!file) || []
});

const mapStateToDispatch = dispatch => ({
    file: bindActionCreators(file, dispatch)
});

export default connect(mapStateToProps, mapStateToDispatch)(TabsBar);