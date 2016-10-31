import React, {Component, PropTypes} from 'react'
import FileTab from './FileTab'
import logger from 'cdm-logger'

export default class TabsBar extends Component {

  constructor () {
    super(...arguments)

    this.onClose = this.onClose.bind(this)
    this.onActivate = this.onActivate.bind(this)
  }

  onClose (file) {
    this.props.actions.close(this.props.workspaceId, file.relativePath)
  }

  onActivate (file) {
    this.props.actions.activate(this.props.workspaceId, file.relativePath)
  }

  render () {
    let {opened, active } = this.props;
    logger.debug("[TabsBar] opened list:", opened);

    return (
      <div className='tabs-bar'>
        { opened.map(file => <FileTab
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
    workspaceId: PropTypes.string.isRequired,
    opened: PropTypes.array.isRequired,
    active: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
};
