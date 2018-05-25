import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

export default function connect(mapStateToProp, mapDispatchToProp) {
  return function(Comp) {
    class WrapperFunc extends PureComponent {
      constructor(props) {
        super(props);
        this.state = {}
      }
      componentDidMount() {
        this.setState({
          ...this.state,
          ...mapStateToProp(this.context.store.getState()),
          ...mapDispatchToProp(this.context.store.dispatch)
        })
      }
      render() {
        return (
          <Comp {...this.state}/>
        )
      }
    }
    WrapperFunc.contextTypes = {
      store: PropTypes.object
    }
    return WrapperFunc;
  }
}