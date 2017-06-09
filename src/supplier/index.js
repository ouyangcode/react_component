import './style/index.scss'
import React , { Component } from 'react'
import { getStore } from '@boluome/common-lib'

class Supplier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      services: getStore('customerConfig','session').services,
      chooseIndex: 0
    }
  }

  componentWillMount(){
    const { services } = this.state
    const { categoryCode } = this.props
    services.map((item ,index) => {
      if(item.categoryCode === categoryCode){
        this.setState({ currentServer : item },() => { this.getBrandLength() })
      }
    })
  }

  getBrandLength(){
    const { brands } = this.state.currentServer
    const { onChange } = this.props
    this.setState({ unitWidth: 100 / brands.length })
    onChange(brands[0])
  }

  handleClick(result,index){
    const { onChange } = this.props
    this.setState({ chooseIndex: index })
    onChange(result)
    // this.props.handleContainerClose()
  }

  render() {
    const { currentServer = {}, chooseIndex, unitWidth } = this.state
    const { brands = [] } = currentServer
    return (
      <div className='channelContainer'>
        {
          brands && brands.length > 1 ?<div>
          <ul>
            {
              brands.map((item ,index) => (
                <li key={ `${ index }` }
                 onClick={ () => this.handleClick(item,index) } style={{ width: unitWidth+'%' }} >
                  <img src={ item.iconUrl } />
                  <span>{ item.brandName }</span>
                </li>
              ))
            }
          </ul>
          <span className='underLine' style={{ width: unitWidth+'%',left: ( chooseIndex * unitWidth ) +'%' }}/>
          </div>: ''
        }

      </div>
    )
  }
}

export default Supplier
