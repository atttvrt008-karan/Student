// import React from 'react'
import React, { Component, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'

class Counter extends Component {
  constructor() {
    super()
    this.state ={}

  }
    handleclick() {
      // const count = useSelector((state) => state.counter.value)
      // const dispatch = useDispatch()
      // console.log(count);

 }

  render() {
    return (
        
      <div>
        hello
        <button
          
          onClick={() =>this.handleclick() }
        >...</button>
        </div>
    );
  }

}
export default Counter;