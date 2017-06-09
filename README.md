# 菠萝觅公共组件库

### 目录

* 流程
  * [安装](#安装)

  * [Demo](#demo)

  * [转码](#转码)

* 基础组件

  * [全局遮罩 (Mask)](#全局遮罩)

  * [Loading](#loading)

  * [滑出层 (SlidePage)](#slidepage)

* 业务组件

  * [红包和平台活动 (Promotion)](#promotion)

  * [红包和平台活动展示 (PromotionDisplay)](#promotiondisplay)

  * [红包 (Coupon) - 未](#红包)

  * [新版平台活动 (NewPromotion)](#newPromotion)

  * [收货地址列表 (ContactList)](#收货地址列表)

  * [收货地址编辑 (ContactForm) - 未](#收货地址编辑)

  * [地址搜索 (AddressSearch)](#地址搜索)

  * [城市列表 (CitySearch)](#城市列表)

  * [搜索 (Search)](#搜索)

  * [为空或错误提示 (Empty)](#为空或错误提示)

  * [供应商导航 (Supplier)](#供应商导航)

  * [个人中心 (UserCenter)](#个人中心)

  * [收货地址的显示 (ContactShow)](#收货地址的显示)

  * [优惠展示](#优惠展示)

  * [增量加载 (Listview)](#增量加载)

  * [星级评价 (Evaluation)](#星级评价)

---

### 安装

```bash
  $ npm i @boluome/oto_saas_web_app_component
```

### Demo

```bash
  $ npm run demo
```

### 转码

  * 发布前需用Babel转码成es5 module

```bash
  $ npm run transform
```

---

### 全局遮罩
* Function

```js
  Mask(Component [, Options])
```
Options :

|参数名|类型|默认值|描述|
|---|---|---|---|
|mask|Boolean|true|是否显示遮罩|
|maskClosable|Boolean|true|是否支持点击遮罩关闭|
|style|Object||遮罩容器样式|
|maskStyle|Object||遮罩样式|

```js
  import { Mask } from '@boluome/oto_saas_web_app_component'

  //普通用法
  Mask(<ChildComponent />)
  //不带遮罩
  Mask(<ChildComponent />, { mask: false })
```

---

### Loading

* Function

```js
  Loading([Options])
```
Options:

|参数名|类型|默认值|描述|
|---|---|---|---|
|component|React Component||自定义Loading组件|
|mask|Boolean|true|是否显示遮罩|
|maskClosable|Boolean|true|是否支持点击遮罩关闭|
|style|Object||Loading容器样式|
|imgStyle|Object||Loading图样式，不支持自定义|

```js
  const handleClose = Loading()
  //关闭Loading
  handleClose()
```

---

### SlidePage

* Component

```js
  <SlidePage />
```
Props:

|参数名|类型|默认值|可选参数|描述|
|---|---|---|---|---|
|target|String|right|right, bottom, left, up|滑出层方向|
|type|String|info|info, root|滑出层类型，info为白色，root为灰色|
|showClose|Boolean|true||是否显示关闭按钮，如果不显示则需要子组件实现关闭|
|closeComponent|React Component|||自定义关闭按钮|
|style|Object|||自定义样式|


```js
  import { Mask, SlidePage } from '@boluome/oto_saas_web_app_component'

  //普通用法
  Mask(<SlidePage target='right'><ChildComponent /></SlidePage>, { mask: false })
  //不显示关闭按钮
  Mask(<SlidePage target='right' showClose={ false } />, { mask: false })
  //自定义关闭按钮
  Mask(<SlidePage target='right' closeComponent={ <Close /> } />, { mask: false })
```

---


### NewPromotion

* Component

```js
  <NewPromotion orderType='huafei' channel='ofpay' amount={ 100 } handleChange={ (reply) => console.log(reply) }   />
```
Props:

| 参数名 | 类型  |描述 |
| --- | --- | --- |
| orderType|  String |  服务类型 |
| channel  |  String |  供应商  |
| amount   |  Number |  当前总价 |
| count   |  Number |  当前总数量，默认为1，可不传 |
| handleChange  | Function  | 当发生优惠变更 |


---

### Promotion

* Component

```js
  <Promotion />
```
Props:

|参数名|类型|描述|
|---|---|---|
|handleChange|Function|当发生优惠变更|


---

### PromotionDisplay

* Component

```js
  <PromotionDisplay />
```
Props:

|参数名|类型|描述|
|---|---|---|
|coupon|Object|优惠券对象|
|activity|Object|平台活动对象|

---

### 红包

* Component

```js
  <Coupon />
```

---

### 收货地址列表

* Component

```js
  <ContactList />
```
Props:

|参数名|类型|描述|
|---|---|---|
|handleChange|Function|当发生收货地址变更|
|contact|Object|当前选中的联系人|

```js
  import { Mask, SlidePage, ContactList } from '@boluome/oto_saas_web_app_component'

  Mask(
    <SlidePage target='right' type='root' >
      <ContactList handleChange={ contact => console.log(contact) }/>
    </SlidePage>
    , { mask: false, style: { position: 'absolute' } }
  )
```

---

### 收货地址编辑

* Component

```js
  <ContactForm />
```

---

### 地址搜索

* Component

```js
  <AddressSearch />
```
Props:

|参数名|类型|描述|
|---|---|---|
|onSuccess|Function|当发生收货地址变更|
|longitude|Int|经度|
|latitude|Int|纬度|

```js
  import { Mask, SlidePage, AddressSearch } from '@boluome/oto_saas_web_app_component'

  Mask(
    <SlidePage target='right' >
      <AddressSearch { ...point } handleChange={ addressResult => console.log(addressResult) }/>
    </SlidePage>
  , { mask: false, style: { position: 'absolute' } })
```
---

### 城市列表

* Component

```js
  <CitySearch />
```

Props:

| 参数名     | 类型      | 描述                                          |
| :--:      | :--:     | :--:                                          |
| localCity | String   | 当前定位的地址                                  |
| handleCityData  | Function | 当选择地址后会执行的回调函数，有一个默认的参数       |
| categoryCode       | String | 当前服务的品类，如："shenghuojiaofei"       |
| api       | String／Array | 地址请求的api,或是请求回来的城市列表数据       |

> 注意事项

* api接口请求回的数据格式或是传入的城市列表数据格式应符合：{name:"上海", py:"shanghai", "id:"021"}, 否则数据无法正确渲染
* handleCityData函数默认参数：当前选择的对应城市列表中的元素，当定位地址不在城市列表中时，返回参数格式是{ name : "定位城市名" }
* categoryCode是为了区分多个品类同时存在地址搜索时，搜索历史混乱的情况

```js
  import { Mask, SlidePage, CitySearch } from '@boluome/oto_saas_web_app_component'

  Mask(
    <SlidePage target='right' showClose={ false } >
      <CitySearch localCity="呵呵" categoryCode="shenghuojiaofei+" handleCityData = { (result) => { console.log(result) }} api = { cityArr } handleClose={ () => console.log(111) } />
    </SlidePage>
  , { mask: false, style: { position: 'absolute' } })

```
---

### 搜索

* Component

```js
  <Search />
```

Props:

|参数名|类型|描述|
|---|---|---|
|inputPlaceholder|String|搜索框的placeholder|
|content|Component|默认显示在搜索框下的内容，以组件方式传入,不传则不显示|
|onFeach|Function|获取列表数据的方法，返回搜索的结果和搜索的关键字。|
|listItem|Component|搜索出结果后搜索列表的样式和内容，以组件方式传入|
|handleResult|Function|用户选择一个搜索项后执行的回调函数，会返回一个对象，包含选择的所有内容|
|noResult|Component|搜索没有返回相应结果时显示的内容，可以直接传入Empty组件。|
|rightComponent|Component|搜索框右侧显示的内容，不传则不显示|
|leftComponent|Component|搜索框左侧显示的内容，不传则不显示|
|handleClick|Function|点击搜索框的回调函数，非必传参数|
|delayTime|Object|搜索延迟时间，非必传参数，不传默认500ms|

```js
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
         delayTime={ 1000 }
       />
      </SlidePage>
    , { mask: false })
```

---

### 为空或错误提示

* Component

```js
  <Empty />
```

Props:

|参数名|类型|描述|
|---|---|---|
|imgUrl|String／component|引进图片的URL／svg的组件|
|title|String|显示的大标题内容，如果不传则不显示。|
|message|String|显示的主要文本，必传。|
|button|Component|如果需要按钮功能可以组件的方式传此参数，回掉样式均自定义，如果不传则不显示。|

```js
  <Empty
    imgUrl  = { imgSrc }
    title   = '我是 titile，不传我则不显示'
    message = '我是 message，我是必传参数'
    button  = { <Button onClick={ ... } /> }
  />

  //如果传入svg图：
  <Empty
    imgUrl  = { <Icon type={ require('./center.svg') } /> }
    title   = '我是 titile，不传我则不显示'
    message = '我是 message，我是必传参数'
    button  = { <Button /> }
  />

```

---

### 供应商导航

* Component

```js
  <ChannelDisplay />
```

Props:

|参数名|类型|描述|
|---|---|---|
|categoryCode|String|当前调用该组件的品类名，例如：酒店则传：'jiudian'、票务传：'piaowu'|
|onChange|Function|点击切换供应商的回调，会以对象方式返回关于该供应商的相关信息|

```js
  <ChannelDisplay categoryCode='jiudian' onChange={ (result) => console.log(result) }/>
```

---

### 个人中心

* Component
* 目前只有跳入当前服务的订单列表的功能
* 置于根组件中

```js
  <UserCenter />
```

Props:

|参数名|类型|描述|
|---|---|---|
|categoryCode|String|服务标识|
|orderTypes|String|以 “,” 隔开，融合多个服务的服务需要传|

```js
  ...
  //单个服务
  <UserCenter categoryCode='dianying' />
  //融合服务
  <UserCenter categoryCode='chongzhi' orderTypes='huafei,liuliang' />
  ...
```
---
### 收货地址的显示

* ContactShow
```js
//contact 没有的时候自己定义他为'',这样现实的就是添加收货地址
<ContactShow { ...{ contact ,handleSuccess } }/>
```

Props:

|参数名|类型|描述|
|---|---|---|
|contact|Object|收货地址信息|
|handleSuccess|Function|点击运行的函数|


-----
### 优惠展示

* ActivePopup
```js
<ActivePopup orderType='huafei' channel='ofpay' amount='111' popupStyle={{height: '90%'}} handlePromotionChange={ (e) => console.log(e) } />
```

Props:

| 参数名                 | 类型       | 描述            |
| ---                   | ---       | ---             |
| orderType             |  String   | 订单类型         |
| channel               |  String   | 供应商           |
| amount                | String    | 订单总额         |
| popupStyle            | Object    | 自定义弹出层样式  |
| handlePromotionChange |  Function | 点击运行的函数    |


> 注：handlePromotionChange应一个回调函数，默认参数是一个对象：{ discountPrice, promotionBackData }。 discountPrice表示当前折扣价格，promotionBackData表示当前平台活动接口返回的data


------
### 增量加载

* Listview
```js
  <Listview />
```


----------

|  参数名  | 类型  | 必需 |  描述  |
| --- | --- | --- | --- |
| offset | Object  | 是 | 偏移量  |
| limit | Object  | 是 | 单次限量  |
| onFetch | Function  | 是 | 增量函数  |
| listItem  | Node  | 是 | list中显示的组件  |
| fetchData | Object/Array  |否  |增量函数可能需要的其他参数  |
| topComponent  | Node  | 否 | 列表头部组件  |
| noOneComponent  | Node  | 否 | 无数据时显示的组件 |

------
### 星级评价

* Evaluation
```js
  <Evaluation defaultValue={ '50%' } width={ '300px' } />
```

----------

|  参数名  | 类型  | 必需 |  描述  |
| --- | --- | --- | --- |
| defaultValue | String  | 是 | 显示点亮星级的百分比  |
| width | String  | 否 | 五颗星星总宽度  |
