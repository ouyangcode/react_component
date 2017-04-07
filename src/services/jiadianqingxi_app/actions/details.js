import { wrap } from '@boluome/oto_saas_web_app_component'
import { get, send, getStore, merge, parseQuery } from '@boluome/common-lib';
import jiaoImg from '../img/jiao.png';

//Project interface
const search = location.search //?a=1&b=2
const objurl = parseQuery(search);console.log('objurl====='+objurl.categoryId)
const detailsUrl = '/jiadianqingxi/v1/category/'+objurl.categoryId;
let datas = {
   channel : 'zmn',
   cityId : objurl.cityId,
   source : '2'
}
// test
export const getDetailsData = ( data ) => dispatch => {
  get( detailsUrl , datas).then(reply => {
     const { code, data, message } = reply;
     data.cityId = objurl.cityId;
     if( code === 0 ){
       dispatch({
         type: 'KJIN_DETAILSHOW',
         detailsData: data
       })
     }else{
        console.log('数据加载失败')
     }
  }).catch( err => console.log('message'))
}
