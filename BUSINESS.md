# 公共业务库

```js
  import * from 'business'
```


### 客户 ( customer )

相关信息都会存入 sessionStorage

登陆成功后会存入：

  * customerUserId -> 用户ID
  * userPhone      -> 用户手机（某供应商没有手机）
  * token


定位成功后会存入：

  * geopoint -> 经纬度 { longitude, latitude }
  * currentAddress -> 当前地址: String
  * currentPosition -> 地址对象: Object, 包含省、市、区、街道、街道号

```js

  import { customerCode, isTest, customerConfig, login, getLocation, unionLogin } from 'business'

  //客户的唯一标识, String, 例如：allinpay -> 通联、scity -> 神码、abchina -> 农行
  customerCode

  //是否为测试环境, Boolean
  isTest       

  //项目初始之前执行
  //获取客户的配置，包括购买的服务、服务所包含的供应商、支付方式等
  //并且按需加载客户的 SDK
  //customerCode: 客户的唯一标识
  //callback: 成功回调函数
  customerConfig(customerCode, callback) // callback = err => {}

  //联合登陆，加载客户配置 -> 登陆 -> 获取定位 -> 执行回调
  unionLogin(callback) // callback = err => {}

  //登陆
  login(callback)  // callback = (err, user) => {}

  //获取定位（暂时不知道如何捕获异常...）
  getLocation(callback)

```

### 枚举（ enums ）

```js
  import {
    channelEnum,      //供应商枚举
    orderTypeEnum,    //服务品类枚举
    orderStatusEnum,  //订单状态枚举
    paymentEnum       //支付方式枚举
  } from 'business'
```

### 支付（ pay ）

```js
  import { pay } from 'business'
  //payment: 支付方式对象
  //order  : 订单Lite对象
  pay(payment)(order)
```
