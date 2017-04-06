import { wrap } from '@boluome/oto_saas_web_app_component'
import { get, send, getStore, merge } from '@boluome/common-lib';
import jiaoImg from '../img/jiao.png';

//Project interface
const listUrl = '/jiadianqingxi/v1/categories';
// test
export const getListData = ( data ) => dispatch => {
  get( listUrl , { city : '上海' , source : 2 }).then(reply => {
     const { code, data, message } = reply
     if( code === 0 ){
       dispatch({
         type: 'KJIN_LISTSHOW',
         listDate: data
       })
     }else{
        console.log('数据加载失败')
     }
  }).catch( err => console.log('message'))
}
