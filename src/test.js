import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux'

const WrapperFunc = (count) => (WrappedComp) => 
  class WrapperFunc extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        count
      }
    }
    render() {
      return (
        <WrappedComp data = {this.state} {...this.props} />
      )}
  }

class wrappedComp extends PureComponent {
  render() {
    return(
      <div>
        {this.props.data.count}
      </div>
    )}
}
export const WrapperComp = WrapperFunc(1)(wrappedComp);
export const WrapperComp1 = WrapperFunc(2)(wrappedComp);