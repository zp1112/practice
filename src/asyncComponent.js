import React, { Component, PureComponent } from 'react';
import Immutable from 'immutable';
import logo from './logo.svg';
import './App.css';
import { WrapperComp, WrapperComp1 } from './test';
import connect from './connect';

export default function asyncComponentWrapper (importFunc) {
  return class asyncComponent extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        component: ''
      }
    }
    componentDidMount() {
      importFunc().then(mod => {
        this.setState({
          component: mod.default || mod
        });
      })
    }
    render() {
      const C = this.state.component;
      return (C ? <C {...this.props} /> : null)
    }
  }
} 