// @flow

import React, {Component} from 'react';

export class OneColumn extends Component<any, any> {
  render() {
    return <div className={'comp-columns small-12 columns ' + (this.props.className || '')}>
      {this.props.children}
    </div>;
  }
}

export class TwoColumn extends Component<any, any> {
  render() {
    return <div className={'comp-columns small-12 large-6 columns ' + (this.props.className || '')}>
      {this.props.children}
    </div>;
  }
}

export class ThreeColumn extends Component<any, any> {
  render() {
    return <div className={'comp-columns small-12 xlarge-4 columns ' + (this.props.className || '')}>
      {this.props.children}
    </div>;
  }
}

export class FourColumn extends Component<any, any> {
  render() {
    return <div className={'comp-columns small-12 medium-6 xlarge-3 columns ' + (this.props.className || '')}>
      {this.props.children}
    </div>;
  }
}