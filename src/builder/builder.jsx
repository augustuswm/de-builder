// @flow

import React, {Component} from 'react';
import type {Element} from 'react';
import Tree from './../lib/tree';
import map from './../mapper/map';
import demoMap from './../mapper/builder.jsx';
import Renderer from './../renderer/renderer';

import type {Comp} from '../lib/comp';

import compLib from './library';
import Config from '../components/builder/config.jsx';

let id = require('shortid');

type BuilderProps = {
};

type BuilderState = {
  compTree: Tree<Comp>,
  config: {
    open: boolean,
    comp: string
  }
};

let sampleTree = new Tree(
  {component: "OneColumn", config: {_id: id()}},
  [
    new Tree(
      {component: "TwoColumn", config: {_id: id()}},
      [
        new Tree(
          {component: "Link", config: {_id: id(), href: "http://www.google.com", text: "Google"}}
        )
      ]
    ),
    new Tree(
      {component: "FourColumn", config: {_id: id()}},
      [
        new Tree(
          {component: "CreditCard", config: {_id: id(), cardholderName: true}}
        )
      ]
    )
  ]
);

export default class Builder extends Component<BuilderProps, BuilderState> {
  constructor(props: BuilderProps) {
    super(props);

    this.state = {
      compTree: sampleTree,
      config: {
        open: false,
        comp: ''
      }
    };
  }

  closeConfig() {
    this.setState({
      config: {
        open: false,
        comp: this.state.config.comp
      }
    });
  }

  toggleConfig(compId: string) {
    let {open, comp} = this.state.config;

    this.setState({
      config: {
        open: compId === comp ? !open : true,
        comp: compId
      }
    });
  }

  wrappedConfigComp() {
    return function wrappedConfigComp({compId}: {compId: string}) {
      return <Config onClick={this.toggleConfig.bind(this)} compId={compId}></Config>;
    }.bind(this);
  }

  renderConfigInput(k: string, defaultV: string, handler: Function) {
    return <li className="config-item" key={k}>
      <span>{k}</span>
      <input type="text" defaultValue={defaultV} onInput={handler} />
    </li>;
  }

  renderConfigSelect(k: string, defaultV: string, options: Array<string>, handler: Function) {
    return <li className="config-item" key={k}>
      <span>{k}</span>
      <select defaultValue={defaultV} onChange={handler}>
        {options.map((o, i) => {
          <option key={i} value={o}>{o}</option>
        })}
      </select>
    </li>;
  }

  renderConfigToggle(k: string, defaultV: boolean, handler: Function) {
    return <li className="config-item" key={k}>
      <span>{k}</span> <input type="checkbox" defaultChecked={defaultV} onChange={handler} />
    </li>;
  }

  renderConfigOptions(tree: Tree<Comp>) {
    let val = tree.getValue();
    let C = map(val);
    let label = C.name;

    let options = <div>
      No configuration options are available.
    </div>;

    if (C.config !== null && typeof C.config === 'object') {
      options = <div>
        <ul className="config-list">
          {Object.keys(C.config).map(k => {
            let typeCheck = C.config[k];

            let handler = e => {
              let nConfig = Object.assign({}, val.config);
              nConfig[k] = e.target.value;

              tree.setValue(
                Object.assign({}, val, {config: nConfig})
              );

              this.setState({
                compTree: this.state.compTree
              })
            };

            if (typeof C.config === 'object' && C != null && C.config) {
              if (typeof typeCheck === 'boolean') {

                let handler = e => {
                  let nConfig = Object.assign({}, val.config);
                  nConfig[k] = e.target.checked;

                  tree.setValue(
                    Object.assign({}, val, {config: nConfig})
                  );

                  this.setState({
                    compTree: this.state.compTree
                  })
                };

                return this.renderConfigToggle(k, val.config[k], handler);
              } else if (Array.isArray(typeCheck)) {
                return this.renderConfigSelect(k, val.config[k], typeCheck, handler);
              } else {
                return this.renderConfigInput(k, val.config[k], handler);
              }
            }
          })}
        </ul>
      </div>;
    }

    return <div key={label + '-' + val.config._id}>
      <pre className="comp-config-name">{'<' + label + '/>'}</pre>
      {options}
    </div>;
  }

  render() {
    let configComp = this.state.compTree.find((c: Comp) => this.state.config.comp === c.config._id);

    return (
      <div className="builder-ui">
        <div className="library">
          <div className="panel panel-left">
            <h3 className="panel-header">Components</h3>
            <ul className="comp-list">
              {compLib.map(c => <li className={c.class + ' comp-item'} key={c.class}>
                {c.name}
              </li>)}
            </ul>
          </div>
        </div>
        <div className="demo">
          <div className="panel panel-center">
            <h3 className="panel-header">UI</h3>
            <Renderer
              tree={this.state.compTree}
              mapper={demoMap(this.wrappedConfigComp())} />
          </div>
        </div>
        <div className={'config-panel' + (this.state.config.open ? ' open' : '')}>
          <div className="panel panel-right">
            <h3 className="panel-header">Config</h3>
            <div className="panel-close" onClick={() => this.closeConfig()}>X</div>
            {configComp && this.renderConfigOptions(configComp)}
          </div>
        </div>
      </div>
    );
  }
}