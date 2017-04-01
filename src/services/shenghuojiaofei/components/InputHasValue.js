import React from "react"
import { InputItem } from "antd-mobile"

class InputHasValue extends React.Component {
  constructor(props) {
    super(props);
    let { billNo } = props
    billNo = billNo ? billNo : ""       //要把当前input框中的内容保存在store中，要不然每次onchange都会更新组件为“”
    this.state = {value : billNo};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {     //
    this.setState({value: event});
    this.props.handleInputChange(event) //调用container中定义的input中数据改变事件
  }


  componentWillReceiveProps({ billNo }){    //属性更新时，执行的操作
    this.setState({value: billNo})     //当传入的属性中billNo改变时，重新设置input框中的值（改变服务时，会将billNo设为空）
  }

  render() {
    let {currentOrgNeedPwd, billNo, currentOrgTypeName, handlePwdChange} = this.props
    if(currentOrgNeedPwd){
      return (
        <div>
          <InputItem value={this.state.value} placeholder={"请输入" + currentOrgTypeName} onChange={ this.handleChange } >{currentOrgTypeName}：</InputItem>
          <InputItem placeholder="请输入密码" onChange={ handlePwdChange } >密码：</InputItem>
        </div>
      )
    }else{
      return (
        <div>
          <InputItem type="number" value={this.state.value} placeholder={"请输入" + currentOrgTypeName} onChange={ this.handleChange } >{currentOrgTypeName}：</InputItem>
        </div>
    )}
  }
}

export default InputHasValue
