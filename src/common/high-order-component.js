import React, { Component } from 'react'
import { customerConfig, login, getLocation } from 'business'


const preset = Component => (
  class extends Component {
    render() {
      return <Component { ...this.props } { ...this.state }  />
    }
  }
)
