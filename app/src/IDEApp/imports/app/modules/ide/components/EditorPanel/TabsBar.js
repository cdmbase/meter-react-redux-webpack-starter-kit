import React, {Component} from 'react'
import FileTab from './FileTab'

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
    let {opened, active } = this.props

    return (
      <div className='code-editor-toolbar'>
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
