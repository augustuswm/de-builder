// @flow

import React from 'react';
import type {Comp} from '../lib/comp';

// Components
import Para from '../components/paragraph.jsx';
import Text from '../components/text.jsx';
import Link from '../components/link.jsx';
import CreditCard from '../components/creditCard.jsx';
import {OneColumn, TwoColumn, ThreeColumn, FourColumn} from '../components/columns.jsx';

export default function(connect: Function => Function): Comp => Function|string {
  return function map(comp: Comp): Function {
    switch (comp.component) {
      case "Para":
        return connect(Para);
      case "Link":
        return connect(Link);
      case "Text":
        return connect(Text);
      case "CreditCard":
        return connect(CreditCard);
      case "OneColumn":
        return connect(OneColumn);
      case "TwoColumn":
        return connect(TwoColumn);
      case "ThreeColumn":
        return connect(ThreeColumn);
      case "FourColumn":
        return connect(FourColumn);
      default:
        let C = comp.component;
        return props => <C {...props}>{props.children}</C>;
    }
  }
}