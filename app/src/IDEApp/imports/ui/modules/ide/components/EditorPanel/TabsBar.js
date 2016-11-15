import React, {Component, PropTypes} from 'react'
import FileTab from './FileTab'
import logger from 'cdm-logger'

export default class TabsBar extends Component {

    constructor() {
        super(...arguments)

        this.onClose = this.onClose.bind(this)
        this.onActivate = this.onActivate.bind(this)
    }

    onClose(file) {
        this.props.actions.close(file.relativePath)
    }

    onActivate(file) {
        this.props.actions.activate(file.relativePath)
    }

    render() {
        let {opened, active} = this.props;
        logger.debug("[TabsBar] opened count:", opened.length);

        return (
            <div className='tabs-bar'>
                { opened.map((file, index) => <FileTab key={index}
                    active={active === file.relativePath}
                    onActivate={this.onActivate}
                    onClose={this.onClose}
                    file={file}
                />)
                }
            </div>
        )
    }
}

TabsBar.propTypes = {
    opened: PropTypes.array.isRequired,
    active: PropTypes.string,
    actions: PropTypes.object.isRequired
};
