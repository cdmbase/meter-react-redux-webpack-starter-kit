import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom'
import IOClient from 'socket.io-client'
import Terminal from 'xterm'
// import fit from 'xterm/addons/fit';
import logger from 'cdm-logger'


class TerminalPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onResize = this.onResize.bind(this);
  }

  // onClick(status) {
  //   return e => {
  //     e.preventDefault();
  //     this.props.toggle(status);
  //   }
  // }

  // componentDidMount() {
  //   //TODO: Resize event not triggering
  //   // this.refs.nv.addEventListener('resize',  this.onResize);
  //   findDOMNode(this).addEventListener('resize', evt => console.log('resized'));
  //   // window.addEventListener('resize', () => {
  //   //     store.dispatch(screenResize(window.innerWidth));
  //   // });
  //
  //   this.props.init();
  //   const toJson = res => res.json();
  //   const getPid = () => this.props.init();
  //   //const getPid = () => init()
  //   //const WSConnection = pid => IOClient.connect(`ws://${ location.hostname }:${ location.port }/xterm`);
  //   const WSConnection = pid => IOClient.connect(`ws://localhost:3006/xterm`);
  //   const openTerminal = (term, dom) => term.open(dom);
  //   const attachTerminal = (term, ws) => term.attach(ws);
  //   const createTerminal = options => new Terminal(options);
  //
  //
  //   this.terminal = createTerminal({cursorBlink: true});
  //
  //
  //   getPid().then(pid => {
  //     let connection = WSConnection(pid);
  //
  //     connection.on('connect', (socket) => connection.emit(`term.connect`, {pid}));
  //     const terminalContainer = document.getElementById('terminal-container');
  //     openTerminal(this.terminal, terminalContainer);
  //     this.terminal.fit();
  //
  //     this.terminal.writeln("Workspace Terminal");
  //
  //     connection.on('data', ({data}) => {
  //       this.terminal.write(data);
  //     });
  //
  //     this.terminal.on('key', function (message, ev) {
  //       var printable = (
  //         !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
  //       );
  //
  //       connection.emit('message', {pid, message});
  //     });
  //
  //     this.terminal.on('paste', function (message, ev) {
  //       connection.emit('message', {pid, message});
  //     });
  //
  //
  //   }).catch(error => {
  //     logger.error("[Terminal]", error);
  //   });
  // }

  // componentWillUnmount() {
  //   if (typeof window !== 'undefined')
  //     window.removeEventListener('resize', this.onResize)
  // }
  //
  // onResize() {
  //   logger.debug("Resize trigger")
  //   this.terminal.fit();
  // }

  render() {
    let {terminal = false, url} = this.props;
    return (
      <div ref="nv" className="terminal-panel">
        <div className="terminal-header">
          <div className="action-btns">
            <i onClick={this.onClick(!terminal)}
               className={`glyphicon glyphicon-triangle-top ${terminal && 'hidden'}`}/>
            <i onClick={this.onClick(!terminal)}
               className={`glyphicon glyphicon-triangle-bottom ${!terminal && 'hidden'}`}/>

            <i className={`glyphicon glyphicon-remove hidden`}/>
          </div>
        </div>
        <div id="terminal-container">

        </div>
      </div>
    )
  }
}


export default TerminalPanel;
