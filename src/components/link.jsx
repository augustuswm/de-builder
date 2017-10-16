// @flow

import React, {Component} from 'react';

class Link extends Component<any, any> {
  static config;

  render() {
    return (
      <a className={'comp-para ' + (this.props.className || '')}
        href={this.props.href} target={this.props.target} title={this.props.title}>
        {this.props.text}
        {this.props.children}
      </a>
    );
  }
}

Link.config = {
  text: '',
  href: '',
  target: '',
  title: ''
};

export default Link;