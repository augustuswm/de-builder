// @flow

import React, {Component} from 'react';

class Para extends Component<any, any> {
  static config;

  render() {
    return <p className={'comp-para ' + (this.props.className || '')}>
      {this.props.text}
      {this.props.children}
    </p>
  }
}

Para.config = {
  text: ''
};

export default Para;