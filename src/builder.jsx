// @flow

import React from 'react';
import {render} from 'react-dom';

import Builder from './builder/builder.jsx';

let container = document.getElementById('container');
render(<Builder/>, container);