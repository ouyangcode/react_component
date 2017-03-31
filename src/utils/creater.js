
import React, { Component } from 'react'
import { extend } from './func'

///NEW
export const wrap = mapFunctions => WrappedComponent =>
class extends Component {
  constructor(props) {
    super(props)
    const { dispatch } = props
    extend(this, mapFunctions(dispatch, props, this))
  }
  render() {
    return <WrappedComponent { ...this.props } { ...this.state } />
  }
}

///OLD
export const create =
WrappedComponent =>
({
  componentWillMount        = func,
  componentDidMount         = func,
  componentWillUpdate       = func,
  componentDidUpdate        = func,
  componentWillUnmount      = func,
  componentWillReceiveProps = func
}) =>
class extends Component {
  constructor(props) {
    super(props)
    this.dispatch = props.dispatch
  }

  componentDidMount         = () => componentDidMount(        this.dispatch, this.props)
  componentWillMount        = () => componentWillMount(       this.dispatch, this.props)
  componentWillUpdate       = () => componentWillUpdate(      this.dispatch, this.props)
  componentDidUpdate        = () => componentDidUpdate(       this.dispatch, this.props)
  componentWillUnmount      = () => componentWillUnmount(     this.dispatch, this.props)
  componentWillReceiveProps = () => componentWillReceiveProps(this.dispatch, this.props)

  render() {
    return <WrappedComponent { ...this.props } />
  }
}



const func = () => {}
