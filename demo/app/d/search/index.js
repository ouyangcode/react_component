import React from 'react'
import { List, Icon, Toast, Modal } from 'antd-mobile'
import { getStore, setStore, get } from '@boluome/common-lib'
import { Search, Mask, SlidePage, Empty, Loading } from '@boluome/oto_saas_web_app_component'
import './style.scss'
import img from '../empty/empty.png'

const Item = List.Item
const SearchDemo = () => {
  return (
    <Item arrow='horizontal' onClick={ () =>
        Mask(
          <SlidePage target='right' showClose={ false }>
            <Search
             inputPlaceholder={ '请输入搜索内容' }
             content={ <Content /> }
             listItem={ <ListItem /> }
             noResult={ <Empty message = '找不到我～～～' imgUrl = { img } /> }
             onFeach={ search }
             handleResult={ (result) => { console.log('result:',result) }}
             rightComponent={ <Cancel /> }
             leftComponent={ <Mycom /> }
             delayTime = { 1000 }
             />
          </SlidePage>
        , { mask: false })
      } >
      搜索列表
    </Item>
  )
}

export default SearchDemo

const Mycom = () => {
  return(
    <div className='leftC'>哈哈</div>
  )
}

const Cancel = ( props ) => {
  console.log('props-----', props);
  const { handleContainerClose } = props
  return (
    <span className='cancel' onClick={ () =>  handleContainerClose()  }>取消</span>
  )
}

// 搜索请求通过组件方式传入
const search = (searchKey, cb) => {
  if(searchKey){
    const handleClose = Loading()
    get('/piaowu/queryActivityList', { cityCode: '021', search: searchKey })
    .then(({ code, data = {}, message }) => {
      if(code === 0) {
        cb(null, data)
        handleClose()
      } else {
        cb(message)
        console.log(message)
        handleClose()
      }
    }).catch(err => {
      cb(err)
      console.log(err)
      handleClose()
    })
  } else {
    cb('searchKey is undefined')
  }
}

// 通过组件传入搜索项的显示内容、样式等
// const ListItem = ({ residentialareaName='', address, searchKey }) => {
//   return (
//     <div className='districtContainer'>
//       <h2 ref={ node => {
//         if(node) {
//           node.innerHTML = residentialareaName.replace(new RegExp(searchKey, "g"), `<span style='color: #ff9a00'>${ searchKey }</span>`)
//         }
//       }}></h2>
//       <p>{ address }</p>
//     </div>
//   )
// }
const ListItem = ({ data, index, searchKey }) => {
  // console.log('searchKey----',searchKey)
  const { name } = data
  return (
    <div className='itemBox'>
      <h2>{ name }</h2>
    </div>
  )
}

// 默认显示于搜索框下的内容，此处实例为历史记录
const Content = () => {
  //获取到历史，并展示它
  // const alert = Modal.alert;
  // let searchHistory = getStore('searchHistory' , 'session')
  // // 清除历史记录
  // let cleanHistory = () => {
  //   setStore('searchHistory', '' ,'session')
  //   document.querySelector('#history').style.display = 'none'
  // }

  return (
    <div className='contentTest' onClick={ () => console.log(123) }>I am content</div>
    // <div>
    //   {
    //     searchHistory && searchHistory.length > 0 ?
    //       <div className='history' id='history'>
    //         <div className='title'>搜索记录</div>
    //         <ul>
    //           {
    //             searchHistory.reverse().map((item, index) => (
    //               <li key={ `search-${ index }` } onClick={ () => onClick(item) }>
    //                 <p>{ item.residentialareaName ? item.residentialareaName : item }</p>
    //               </li>
    //             ))
    //           }
    //         </ul>
    //         <div className='deleteHistory' onClick={() => alert('删除', '确定删除么???', [
    //           { text: '取消', onPress: () => console.log('cancel') },
    //           { text: '确定', onPress: () => cleanHistory(), style: { fontWeight: 'bold' } },
    //         ])}>清空搜索记录</div>
    //       </div>
    //     : ''
    //   }
    // </div>
  )
}

// // 将用户选择写入历史记录
// const resultInHistory = (item) => {
//   let historyArr = getStore('searchHistory' , 'session') && getStore('searchHistory' , 'session').length > 0 ? getStore('searchHistory' , 'session') : []
//   const { residentialareaName } = item
//   if(residentialareaName){
//     historyArr.push(residentialareaName)
//   }
//   let newArr = []
//   historyArr.map((item ,index)=>{
//     if(newArr.indexOf(item) == -1) {
//       newArr.push(item);
//     } else {
//       newArr.push(item);
//       newArr.splice(newArr.indexOf(item),1)
//     }
//   })
//   setStore('searchHistory',newArr,'session')
// }
