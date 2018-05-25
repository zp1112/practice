import React, { Component, PureComponent } from 'react';
import Immutable from 'immutable';
import logo from './logo.svg';
import './App.css';
import { WrapperComp, WrapperComp1 } from './test';
import connect from './connect';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: Immutable.fromJS({
        count: 0,
        user: {
          name: 'zp'
        }
      }),
      test: 'hello',
      val: 0,
      test1: {
        test: 11
      }
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  componentWillReceiveProps = (prevProp) => {
    // console.log(555, prevProp)
  }
  shouldComponentUpdate(state1, state2) {
    // console.log(666, state1, state2);
    // return true;
  }
  componentWillUpdate = (props, state) => {
    // console.log(999999, props, state)
  }
  componentWillUnmount = () => {
  }
  // deepEquals = (obj1, obj2) => { 
  //   if (obj1 === obj2) {
  //     return true;
  //   }
  //   for (const key of Object.keys(obj2)) {
  //     if (obj1.hasOwnProperty(key) && obj1[key] === obj2[key]) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  // shouldComponentUpdate = (nextProps, nextState) => {
  //   return  !this.deepEquals(this.state, nextState) || !this.deepEquals(this.props, nextProps);
  // }
  func = () => {
    console.log(this.state.test)
  }
  handleClick = () => {
    // this.setState((d) => {
    //   return {
    //     data: d.data.updateIn(['user', 'name'], () => 'zp')
    //   }
    // })
    // this.setState((prevState) => ({
    //   val: prevState.val + 1
    // }));
    this.setState({
      val: this.state.val + 1
   });
  //  //第一次输出
  //  console.log(this.state.val);
  //  this.setState({
  //     val: this.state.val + 1
  //  });
  //  //第二次输出
  //  console.log(this.state.val);
  //  setTimeout(()=>{
  //     this.setState({val: this.state.val + 1});
  //      //第三次输出
  //      console.log(this.state.val);
  //      this.setState({
  //         val: this.state.val + 1
  //      });
  //      //第四次输出
  //      console.log(this.state.val);
  //  }, 0);  
    // this.setState({
    //   test: 'world'
    // })
    // this.func();
    // this.setState({
    //   test: 'world'
    // }, () => {
    //   this.func();
    // })
  }
  render() {
    // this.setState((d) => {
    //   return {
    //     data: d.data.update('count', () => '555')
    //   }
    // })
    console.log(3333333)
    const data = this.state.data;
    return (
      <div>
        {data.get('count')}
        {this.state.val}
        <WrapperComp />
        <WrapperComp1 />
        {this.props.count}
        <div onClick={this.handleClick}>点击我</div>
        <div>{data.get('count')}</div>
        <div>{data.getIn(['user', 'name'])}</div>
      </div>
    );
  }
}

export default connect((state) => ({count: state.count}), (dispatch) => console.log(333, dispatch))(App);
