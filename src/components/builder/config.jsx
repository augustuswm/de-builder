// @flow

import React, {Component} from 'react';

type ConfigProps = {
  onClick: Function,
  compId: string
};

export default class Config extends Component<ConfigProps, {}> {
  render() {
    let {onClick: handler, compId: id} = this.props;

    return <div className="config-toggle" onClick={(e) => { e.preventDefault(); handler(id) }}>
      <i className="fa fa-cog config-icon" aria-hidden="true"></i>
    </div>;
  }
}