import React, {Component, PropTypes} from 'react';

import '../../../../../../../../node_modules/xterm/src/xterm.css';


class Terminal extends Component {

    onClick(status) {
        return e => {
            e.preventDefault();
            this.props.toggle(status);
        }
    }

    render() {
        console.log(this.props);
        let {terminal = false, url} = this.props;

        return (
            <div>
                <div className="terminal-header">
                    <div className="action-btns">
                        <i onClick={this.onClick(!terminal)}
                           className={`glyphicon glyphicon-triangle-top ${terminal && 'hidden'}`}/>
                        <i onClick={this.onClick(!terminal)}
                           className={`glyphicon glyphicon-triangle-bottom ${!terminal && 'hidden'}`}/>

                        <i className={`glyphicon glyphicon-remove hidden`}/>
                    </div>
                </div>
                <div className={`terminal-body ${terminal ? 'terminal-opened' : 'terminal-closed'}`}>
                    <iframe src={url}>
                        Terminal Error!
                    </iframe>
                </div>
            </div>
        )
    }
}


export default Terminal;