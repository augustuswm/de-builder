// @flow

import React, {Component} from 'react';

class Text extends Component<any, any> {
  static config;

  render() {
    return <span className={'comp-span ' + (this.props.className || '')}>
      {this.props.text}
      {this.props.children}
    </span>
  }
}

Text.config = {
  text: ''
};

export default Text;