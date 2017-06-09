import React from 'react'
import { List } from 'antd-mobile'
import { Focus, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'
import { get } from '@boluome/common-lib'

const Item = List.Item





const FocusDemo = () =>{
  let dataList = [];
  get(`/dianying/v1//cinema/2189/films`,{'channel': 'kou','cinemaId':'2189','cityId':53}).then(({ code, data, message} ) => {
           if(code===0){
              dataList = data.films
           }else{
             console.log(message);
           }
         })
  return (
    <Item arrow='horizontal' onClick={ () =>
        Mask(
          <SlidePage target='right' showClose={ true }>
            <Focus
              dataList = {dataList}
              onChange={ (res)=>{console.log(res)} }
              />
          </SlidePage>
        , { mask: false, style: { position: 'absolute' } })
      } >
      焦点图
    </Item>
  )
}

export default FocusDemo
