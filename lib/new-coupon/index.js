'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

require('./style/coupon.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewCoupon = function NewCoupon(_ref) {
  var title = _ref.title,
      subtitle = _ref.subtitle,
      type = _ref.type,
      discount = _ref.discount,
      value = _ref.value,
      ets = _ref.ets,
      orderType = _ref.orderType,
      handleCouponType = _ref.handleCouponType,
      acitivityMutex = _ref.acitivityMutex,
      bSelected = _ref.bSelected,
      _ref$deductionPrice = _ref.deductionPrice,
      deductionPrice = _ref$deductionPrice === undefined ? 0 : _ref$deductionPrice,
      threshold = _ref.threshold,
      onClick = _ref.onClick;

  var availability = false; //表示当前优惠券是否可用
  if (deductionPrice !== 0) {
    availability = true;
  }
  return _react2.default.createElement(
    'div',
    { className: 'coupon-item',
      onClick: onClick },
    _react2.default.createElement(
      'p',
      { className: 'p-left ' + (availability ? '' : 'ineffective') },
      _react2.default.createElement(
        'span',
        null,
        type === 1 ? '¥' : ''
      ),
      type === 1 ? value : discount * 10,
      _react2.default.createElement(
        'span',
        { style: { fontSize: '.24rem' } },
        type === 1 ? '' : '折'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'd-center' },
      _react2.default.createElement(
        'p',
        { className: 'p-top' },
        _react2.default.createElement(
          'span',
          { className: 's-left ' + (availability ? '' : 'ineffective') },
          title
        ),
        _react2.default.createElement(
          'span',
          { className: 's-right ' + (availability ? '' : 'ineffective') },
          '\uFF08\u6EE1',
          threshold,
          '\u53EF\u7528\uFF09'
        )
      ),
      _react2.default.createElement(
        'p',
        { className: 'p-bottom ' + (availability ? '' : 'ineffective') },
        acitivityMutex ? '该优惠劵可用但不能与该平台活动同享' : ''
      )
    ),
    _react2.default.createElement(
      'p',
      { className: 'p-right' },
      bSelected && !!deductionPrice && !acitivityMutex && _react2.default.createElement(_icon2.default, { type: require('./img/check.svg') })
    )
  );
};

// <div className='block header pos-relative' style={{ backgroundImage:'url(' + (deductionPrice == 0 ? ineffective : effective) + ')' }}>
//   <span className='blod price-layer'>
//      { handleCouponType(type, discount, value) }
//   </span>
//   <span className='fright' style={{ width: '68%' }}>
//     <span className='block white blod' style={{ fontSize:".36rem", padding:'.32rem 0 0  .32rem' }}>{ title }</span>
//     <span className='block white' style={{ fontSize:".26rem", padding:'.10rem 0 0 .32rem' }}>{ subtitle }</span>
//     {
//       false && <span className='pos-absolute' style={{ top: '.40rem', right: '.40rem' }}><img src={ newCoupon } style={{ width:'1.60rem' }} /></span>
//     }
//     {
//       bSelected && <img className='pos-absolute' src={ choose } style={{ top: '40%', right: '.20rem', zIndex:'9', width:'.40rem' }} />
//     }
//   </span>
//   <img src={ deductionPrice == 0 ? ineffective_q : effective_q  } className='pos-absolute' style={{ width:'1.60rem', bottom: '.12rem', right: 0 }} />
// </div>
//
// <div className='block bottom'>
//   <span className='date' style={{ fontSize:".28rem" }}>{ `有效期：${ moment('YYYY.MM.DD')(ets * 1000) }` }</span>
//   <span className='fright orange font-s'>{ type.length == 1 ? '立即使用' : '' }</span>
// </div>

exports.default = NewCoupon;