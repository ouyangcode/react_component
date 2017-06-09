'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.getListData = undefined;

var _get = require('@boluome/common-lib/lib/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getListData = exports.getListData = function getListData(datas) {
   return function (dispatch) {
      var listUrl = '/menpiao/v1/goods/' + '1594651';
      (0, _get2.default)(listUrl, { channel: 'lvmama' }).then(function (reply) {
         var code = reply.code,
             data = reply.data,
             message = reply.message;

         if (code === 0) {
            console.log('ssssss');
            //    dispatch({
            //      type: 'KJIN_LISTSHOW',
            //      listData: data
            //    })
         } else {
            console.log('数据加载失败');
         }
      }).catch(function (err) {
         return console.log('message');
      });
   };
};