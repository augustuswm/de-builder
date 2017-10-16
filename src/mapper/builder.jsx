// @flow

import React from 'react';
import type {Comp} from '../lib/comp';

// Components
import Para from '../components/paragraph.jsx';
import Text from '../components/text.jsx';
import Link from '../components/link.jsx';
import CreditCard from '../components/creditCard.jsx';
import {OneColumn, TwoColumn, ThreeColumn, FourColumn} from '../components/columns.jsx';

export default function(ConfigComp: Function) {
  function injectConfig(Orig, id) {
    return function ConfigWrapped(props) {
      return (
        <Orig {...props} className={props.className + ' builder'}>
          <ConfigComp compId={id}/>
          {props.children}
        </Orig>
      );
    };
  }

  return function map(comp: Comp): Function {
    switch (comp.component) {
      case "Para":
        return injectConfig(Para, comp.config._id);
      case "Link":
        return injectConfig(Link, comp.config._id);
      case "Text":
        return injectConfig(Text, comp.config._id);
      case "CreditCard":
        return injectConfig(CreditCard, comp.config._id);
      case "OneColumn":
        return injectConfig(OneColumn, comp.config._id);
      case "TwoColumn":
        return injectConfig(TwoColumn, comp.config._id);
      case "ThreeColumn":
        return injectConfig(ThreeColumn, comp.config._id);
      case "FourColumn":
        return injectConfig(FourColumn, comp.config._id);
      default:
        return injectConfig(comp.component, comp.config_id)
    }
  };
}