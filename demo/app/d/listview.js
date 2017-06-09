import React from 'react'
import { List } from 'antd-mobile'
import { Listview, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'
import { send, setStore, getStore } from '@boluome/common-lib'

const Item = List.Item





const ListviewDemo = () => (
  <Item arrow='horizontal' onClick={ () =>
      Mask(
        <SlidePage target='right' showClose={ true }>
          <ListViewWrap />
        </SlidePage>
      , { mask: false, style: { position: 'absolute' } })
    } >
    增量加载
  </Item>
)

export default ListviewDemo


class ListViewWrap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      test: 1,
      offset: 0
    }
  }
  handleChangeData() {
    this.setState({ offset:0 })
  }
  addfun(limit, offset, fetchData, onSuccess) {
    send('/shengxian/v1/commodities',{'channel':'yiguo',
                                      'areaId':'312d0556-0671-4f2e-8bac-7b8873b5a03a',
                                      'categoryIdList':["0dc91949-1fcf-4c5e-85f3-83b6e63db1e6"],
                                      'pageSize': limit,
                                      'currentPage': Math.ceil(offset / limit),
                                     },{ 'Content-Type': 'application/json' }).then(({ code, data, message} ) => {
      if(code===0){
        onSuccess(data.commodityInfoList)
        this.setState({ offset: this.state.offset + data.commodityInfoList.length })
      }else {
        console.log(message);
      }
    })
  }
  render() {
    const { fetchData, offset } = this.state
    return (
      <div>

        <Listview
          listItem={ <Listviewli onClick={ () => console.log(1) } /> }
          onFetch={ this.addfun.bind(this) }
          limit={ 20 }
          topComponent={<div><input value='点击重置' type='button' onClick={ this.handleChangeData.bind(this) }  /></div>}
          offset={ offset }
          fetchData={ fetchData }
        />
      </div>
    )
  }
}

const Listviewli = ({ data, onClick }) => (
  <div onClick={ onClick }>
    <p style={{"height":"1rem","lineHeight":"1rem"}}>{ data.commodityName }</p>
  </div>
)
