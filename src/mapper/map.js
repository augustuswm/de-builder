// @flow

import React from 'react';
import type {Comp} from '../lib/comp';

// Components
import Para from '../components/paragraph.jsx';
import Text from '../components/text.jsx';
import Link from '../components/link.jsx';
import CreditCard from '../components/creditCard.jsx';
import {OneColumn, TwoColumn, ThreeColumn, FourColumn} from '../components/columns.jsx';

export default function map(comp: Comp): Function {
  switch (comp.component) {
    case "Para":
      return Para;
    case "Link":
      return Link;
    case "Text":
      return Text;
    case "CreditCard":
      return CreditCard;
    case "OneColumn":
      return OneColumn;
    case "TwoColumn":
      return TwoColumn;
    case "ThreeColumn":
      return ThreeColumn;
    case "FourColumn":
      return FourColumn;
    default:
      let C = comp.component;
      return props => <C {...props}>{props.children}</C>;
  }
}