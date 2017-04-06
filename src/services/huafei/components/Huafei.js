import React from "react"
import { List, InputItem, WhiteSpace, Flex, NoticeBar, Tabs, Button, Toast } from 'antd-mobile';
// import { createForm } from "rc-form"
import "../styles/common.scss"
import "../styles/huafei.scss"

const TabPane = Tabs.TabPane

const Huafei = ({ hfInfo = {isp:""},
 handleHfClick ,handleIptChange, isNotice = "",
 selectedHf = {index : "", list:["","","","","",""]},
 handleSubmit, handleClear,
 phoneHistorys, handlePhoneHistory, curPhone, visibilityHistory, handleClearHistory,
 handleFocus, handleBlur,
 userPhone}) => {
  let hfList = [["5","5.10"], ["10","10.10"], ["50","49.75"], ["100","99.50"], ["200","199.00"], ["300","398.50"]].map(item => ({title: `${item[0]}元`, discPrice: `仅售￥${item[0]}元` }))
  let curHfIndex = "100"
  let curHfArea = ""
  let curHfPrice = " - - -"
  let isSubmit = ""
  if(hfInfo.isp){   //当请求回数据后
    hfList = hfInfo.list.map(item => ({ title: `${item.realPrice}元`, discPrice: `仅售￥${item.price}元` }))
    curHfIndex = 0
    curHfArea = hfInfo.area+hfInfo.isp
    curHfPrice = hfInfo.list[0].price
    isSubmit = "true"
  }else{//当没有数据
    selectedHf = {index : "", list:["","","","","",""]}     //清空当前选中的所有信息
  }
  if(selectedHf.index){   //当已经选择过某个话费后
    curHfIndex = selectedHf.index
    curHfPrice = selectedHf.list.price
  }else{  //当没有选择某个话费时，设置初始值
    selectedHf = { index:0, number:curPhone, isp:hfInfo.isp, area:hfInfo.area, list:{ price: curHfPrice, realPrice: curHfPrice } }
  }
  return (
    <div className="hf">
      <div className="header">
        <HuafeiItem curPhone={curPhone} handleIptChange={ handleIptChange }
           phoneHistorys={ phoneHistorys } visibilityHistory={ visibilityHistory } handlePhoneHistory={ handlePhoneHistory } handleClearHistory={ handleClearHistory }
           handleFocus={ handleFocus } handleBlur={ handleBlur }
           userPhone={ userPhone }/>
        <p className="notice" style={{display : isNotice ? "block" : "none"}}>请输入正确的手机号码</p>
        <span className="area">{curHfArea}</span>
      </div>
      <WhiteSpace />
      <Flex wrap="wrap" className="container">
        {hfList.map((item, index) => {
          if(index==curHfIndex){
            return (<div
                key={ index }
                className="inline active"
                onClick={() => handleHfClick({ index:index, number:curPhone, isp:hfInfo.isp, area:hfInfo.area, list:curHfPrice })}
              ><h1>{item.title}</h1><p>{item.discPrice}</p></div>)
          }
          return (<div
              key={ index }
              className="inline"
              onClick={() => handleHfClick(hfInfo.isp ? { index:index, number:curPhone, isp:hfInfo.isp, area:hfInfo.area, list:hfInfo.list[index] } : "")}
            ><h1>{ item.title }</h1><p>{ item.discPrice }</p></div>)
        })}
      </Flex>
      <div className="footer">
        <p className="pay-price">¥ <span>{ curHfPrice }</span></p>
          {
            isSubmit ? <p className="button active" onClick={ () => { selectedHf.number=curPhone; handleSubmit(selectedHf)} }>提交订单</p> : <p className="button">提交订单</p>
          }
      </div>
    </div>
  )
}

export default Huafei

class HuafeiItem extends React.Component {
  constructor(props) {
    super(props);
    let { userPhone } = props
    this.state = { value : userPhone };   //设置input框中的初始值为联合登陆过来的userPhone
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event });
    this.props.handleIptChange(event) //调用父组件传过来的参数
  }

  componentWillReceiveProps({ curPhone }){
    this.setState({ value: curPhone });
  }

  render() {
    let { curPhone,
      phoneHistorys, visibilityHistory, handlePhoneHistory, handleClearHistory
     } = this.props

    return (
      <div className="number">
        <InputItem
          type="phone"
          value={ this.state.value }
          onChange={ this.handleChange }
          placeholder="请输入要充值的手机号"
          clear
        />
      <PhoneHistory curPhone={ curPhone } phoneHistorys={ phoneHistorys } handlePhoneHistory={ handlePhoneHistory } visibilityHistory={ visibilityHistory } handleClearHistory={ handleClearHistory } />
      </div>
    );
  }
}


const PhoneHistory = ({ curPhone, phoneHistorys=[], handlePhoneHistory, visibilityHistory="", handleClearHistory }) => {
  // 模拟历史记录，测试时可以打开
  // const mockdata = ["182 5500 2974", "182 5510 2974", "182 5200 2974", "182 1500 2974", "182 5566 2974", "182 5591 2974"]
  // phoneHistorys = phoneHistorys ? phoneHistorys : []
  const history_REG = new RegExp( '^'+curPhone, "i" )
  phoneHistorys = phoneHistorys.filter( item => history_REG.test(item) )
  if(phoneHistorys.length>0){
    return (
      <ul className="phone-history" style={{ display: visibilityHistory ? "block" : "none" }}>
        { phoneHistorys.map((item, index) => (<li key={ index } onClick={ () => handlePhoneHistory(item) }>{ item }</li>)) }
        <li className="clearHistory" onClick={ handleClearHistory } >清空历史记录</li>
      </ul>
    )
  }else {
    return (
      <div></div>
    )
  }
}
