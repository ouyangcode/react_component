import React from 'react';
import { List } from 'antd-mobile'
import { Supplier, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'
import { get, setStore, getStore } from '@boluome/common-lib'

const Item = List.Item

const SupplierDemo = () => {
 let simulationData = '{"payments":[{"channelName":"支付宝","channelCode":"alipay_wap","isNativePay":0,"iconUrl":""}],"services":[{"categoryName":"电影","categoryCode":"dianying","iconUrl":"http://app.static.boluomeet.com/icon/category/boot/dianying.png","brands":[{"brandName":"抠电影","brandCode":"kou","iconUrl":"http://app.static.boluomeet.com/icon/brand/boot/kou.png"}]},{"categoryName":"专车","categoryCode":"zhuanche","iconUrl":"http://app.static.boluomeet.com/icon/category/boot/zhuanche.png","brands":[{"brandName":"易到用车","brandCode":"yidao","iconUrl":"http://app.static.boluomeet.com/icon/brand/boot/yidao.png"}]},{"categoryName":"外卖","categoryCode":"waimai","iconUrl":"http://app.static.boluomeet.com/icon/category/boot/waimai.png","brands":[{"brandName":"饿了么","brandCode":"ele","iconUrl":"http://app.static.boluomeet.com/icon/brand/boot/ele.png"}]},{"categoryName":"景点门票","categoryCode":"menpiao","iconUrl":"http://app.static.boluomeet.com/icon/category/boot/menpiao.png","brands":[{"brandName":"驴妈妈","brandCode":"lvmama","iconUrl":"http://app.static.boluomeet.com/icon/brand/boot/lvmama.png"}]},{"categoryName":"演出票务","categoryCode":"piaowu","iconUrl":"http://app.static.boluomeet.com/icon/category/boot/piaowu.png","brands":[{"brandName":"西十区","brandCode":"xishiqu","iconUrl":"http://app.static.boluomeet.com/icon/brand/boot/xishiqu.png"}]},{"categoryName":"咖啡","categoryCode":"coffee","iconUrl":"http://app.static.boluomeet.com/icon/category/boot/coffee.png","brands":[{"brandName":"邻趣","brandCode":"linqu","iconUrl":"http://app.static.boluomeet.com/icon/brand/boot/linqu.png"}]},{"categoryName":"酒店","categoryCode":"jiudian","iconUrl":"http://app.static.boluomeet.com/icon/category/boot/jiudian.png","brands":[{"brandCode":"qunar","brandName":"去哪儿","iconUrl":"http://app.static.boluomeet.com/icon/brand/boot/qunar.png"},{"brandCode":"elong","brandName":"艺龙","iconUrl":"http://app.static.boluomeet.com/icon/brand/boot/elong.png"},{"brandCode":"ctrip","brandName":"携程","iconUrl":"http://app.static.boluomeet.com/icon/brand/boot/ctrip.png"}]}]}'

 setStore('customerConfig',simulationData,'session')

  return (
    <Item arrow='horizontal' onClick={ () =>
        Mask(
          <SlidePage target='right' showClose={ true }>
            <Supplier categoryCode='jiudian' onChange={ (result) => { console.log('result:',result) } }/>
          </SlidePage>
        , { mask: false, style: { position: 'absolute' } })
      } >
      顶部供应商
    </Item>
  )
}

export default SupplierDemo
