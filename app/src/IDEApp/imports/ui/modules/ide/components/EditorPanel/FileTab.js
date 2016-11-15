import React, {Component,PropTypes} from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

export default class FileTab extends Component {

  close (e) {
    e.stopPropagation()
    this.props.onClose(this.props.file)
  }

  render () {
    let {file, active, onActivate} = this.props
    let {module, relativePath} = file

    return (
      <OverlayTrigger placement='top' trigger={['hover', 'focus']}
        overlay={<Tooltip id={relativePath}>{ relativePath }</Tooltip>}>
        <div onClick={e => onActivate(file)} className={`tab ${active && 'tab-active'}`}>
          <span>{ module }</span><i className='glyphicon glyphicon-remove' onClick={this.close.bind(this)} />
        </div>
      </OverlayTrigger>

        )
  }
}
