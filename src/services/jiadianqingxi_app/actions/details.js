import { wrap } from '@boluome/oto_saas_web_app_component'
import { get, send, getStore, merge } from '@boluome/common-lib';
import jiaoImg from '../img/jiao.png';

//Project interface
const detailsUrl = '/jiadianqingxi/v1/category/:categoryId';
let datas = {
   channel : 'zmn',
   cityId : ,
   source : '2'
}
// test
export const getDetailsData = ( data ) => dispatch => {
  get( detailsUrl , datas).then(reply => {
     const { code, data, message } = reply
     if( code === 0 ){
       dispatch({
         type: 'KJIN_DETAILSHOW',
         detailsDate: data
       })
     }else{
        console.log('数据加载失败')
     }
  }).catch( err => console.log('message'))
}
