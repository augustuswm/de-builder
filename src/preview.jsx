// @flow

import React from 'react';
import {render} from 'react-dom';

import Renderer from './renderer/renderer';
import map from './mapper/map';

import Tree from './lib/tree';

let id = require('shortid');

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

let container = document.getElementById('container');
render(<Renderer tree={sampleTree} mapper={map}/>, container);