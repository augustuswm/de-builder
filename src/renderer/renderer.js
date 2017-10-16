// @flow

import React, {Component} from 'react';
import type {Element} from 'react';
import Tree from '../lib/tree';

import type {Comp} from '../lib/comp';

export type RendererProps = {
  tree: Tree<Comp>,
  mapper: Comp => Function|string
};

export default class Renderer extends Component<RendererProps, {}> {
  renderTree(tree: Tree<Comp>): Element<any> {
    return tree.flatMap(
      (value: Comp, flattened: Array<Element<any>>): Element<any> => {
        let C = this.props.mapper(value),
            config = Object.assign({}, value.config),
            key = config._id,
            cond = config._cond;

        delete config['_id'];
        delete config['_cond'];

        return (typeof cond === 'undefined' || cond) &&
          <C key={key} className={'component'} {...config}>
            {flattened}
          </C> || <div></div>;
      }
    );
  }

  render() {
    return this.renderTree(this.props.tree);
  }
}