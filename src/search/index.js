import './style/index.scss'
import React, { Component } from 'react'
import { List, WhiteSpace, InputItem, Switch, Picker, Radio, Button, Toast, Modal } from 'antd-mobile'
import SlidePage from '../slide-page'
import Mask from '../mask'
import Loading from '../loading'
import {  get, send, getStore, setStore} from '@boluome/common-lib'
import { clone, merge } from 'ramda'

let timer

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchKey: '',
      searchHistory: getStore('searchHistory' , 'session')
    }
  }

  componentWillMount(props) {
    const { listItem, content, noResult, rightComponent, leftComponent } = this.props
    if(rightComponent && leftComponent){ this.setState({ inputWidth: '70%' }) }
    else if (rightComponent || leftComponent) { this.setState({ inputWidth: '85%' }) }
    else { this.setState({ inputWidth: '100%' }) }
  }

  handleScroll () {
    // console.log('scroll')
    const { onScroll } = this.props
    onScroll && onScroll()
  }

// 请求列表数据
  feachList (searchKey){
    // console.log('searchKey-==--=-=-=-==-=-=--==-', searchKey.length)
    const { onFeach, delayTime = 500 } = this.props
    this.setState({ searchKey })
    if(searchKey.length > 0){
      this.setState({ loaded: 0 })
      clearTimeout(timer)
      timer = setTimeout(
        () => onFeach(searchKey, (err, dataList) => {
          if(err) { //异常处理
            console.log(err)
          }
          this.setState({ dataList, loaded: 1 })
        }), delayTime)
    } else {
      console.log('no words')
      this.setState({ dataList: [] })
    }
  }

  handleClick (item){
    const { handleResult, timing = 500 } = this.props
    // const { resultInHistory } = this.props
    handleResult(item)
    // resultInHistory(item)
    timing !== 0 && this.props.handleContainerClose()
  }
  handleKeywordChange (keyword) {
    // 把keyword 放进输入框
    // 搜索
    this.setState({ searchKey: keyword }, this.feachList(keyword))
  }

  render() {
    const { listItem, content, noResult, rightComponent, leftComponent, handleClick } = this.props
    let { searchKey, dataList, searchHistory, inputWidth, loaded } = this.state
    let cloneProps = this.props
    let box

    return (
      <div>
        <div className='searchBar'>
          {
            leftComponent ? <div className='leftCom'>{ React.cloneElement(leftComponent,{ ...cloneProps }) }</div> : ''
          }
          <div className='searchMain' style={ { width: inputWidth } }>
            <input id='searchInput' type='text' placeholder={ this.props.inputPlaceholder }
             onChange={ ( e ) =>  this.feachList(e.target.value) } onClick = { handleClick ? () => handleClick() : () => console.log('no click') }
            />
          </div>
          {
            rightComponent ? <div className='rightCom'>{ React.cloneElement(rightComponent,{ ...cloneProps }) }</div> : ''
          }
        </div>
        {
          searchKey.length > 0 && loaded
            ? <SearchResultList { ...{ dataList, listItem, searchKey, noResult, content, loaded, onClick: this.handleClick.bind(this), onScroll: this.handleScroll.bind(this) } } />
            : <div></div>
        }
        {
          content ? React.cloneElement(content,{ onKeywordChange: keyword => this.handleKeywordChange(keyword) }) : ''
        }
      </div>
    )
  }
}

export default Search

const SearchResultList = ({ dataList = [], searchKey, listItem, noResult, onClick, content, loaded, onScroll }) => {
  console.log('loaded------------',loaded,dataList);
  if(dataList && dataList.length > 0) {
    return (
      <div>
        <div className='dataList' onScroll={ () => { onScroll() } }>
          <ul>
            {
              dataList.map((data, index) => <li key={ `SearchResultList-${ Math.random() }` } onClick={ () => {onClick(data)} } >
                                              <div>
                                                { React.cloneElement(listItem, { data, index, searchKey }) }
                                              </div>
                                            </li>
                          )
            }
          </ul>
        </div>
      </div>
    )
  } else if(dataList.length === 0 && loaded) {
    return (<div>{ noResult }</div>)
  } else {
    return <div></div>
  }
}
