import React from 'react'
import { List } from 'antd-mobile'
import { Focus, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'
import { get } from '@boluome/common-lib'

const Item = List.Item

const FocusDemo = () =>{
  let dataList = [];
  // https://blm.otosaas.com/api/dianying/v1/cinema/6088/films?channel=kou&cinemaId=6088&cityId=53
  // https://dev-api.otosaas.com/dianying/v1/cinema/5467/films?channel=kou&cinemaId=5467&cityId=53
  get(`/dianying/v1/cinema/6088/films`,{'channel': 'kou','cinemaId':'6088','cityId':53}).then(({ code, data, message} ) => {
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
              style={{
                zIndex   : '10',
               }}
              initNum={ 3 }
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
