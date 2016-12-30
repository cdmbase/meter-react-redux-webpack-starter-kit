import React, { Component } from 'react';
import '../stylesheets/server.less';

export default class Server extends Component {
  render() {
    const { server, ...rest } = this.props;

    return (
      <div {...rest} className="panel panel-default panel-server">
        <div className="panel-body">
          <h4>
            { server.name }
            <i
              className={`pull-right indicator glyphicon glyphicon-certificate ${server.status}`} />
          </h4>
          <p><strong>ID:</strong> { server._id }</p>
          <p><strong>URL:</strong> { server.url }</p>
        </div>
      </div>
    );
  }
}
