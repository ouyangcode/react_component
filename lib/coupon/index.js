'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('@boluome/common-lib/lib/moment');

var _moment2 = _interopRequireDefault(_moment);

require('./style/coupon.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _effective = require('./img/effective.png');

var _effective2 = _interopRequireDefault(_effective);

var _effective_q = require('./img/effective_q.png');

var _effective_q2 = _interopRequireDefault(_effective_q);

var _ineffective = require('./img/ineffective.png');

var _ineffective2 = _interopRequireDefault(_ineffective);

var _ineffective_q = require('./img/ineffective_q.png');

var _ineffective_q2 = _interopRequireDefault(_ineffective_q);

var _new = require('./img/new.png');

var _new2 = _interopRequireDefault(_new);

var _coupon_choose = require('./img/coupon_choose.png');

var _coupon_choose2 = _interopRequireDefault(_coupon_choose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Coupon = function Coupon(_ref) {
  var title = _ref.title,
      subtitle = _ref.subtitle,
      type = _ref.type,
      discount = _ref.discount,
      value = _ref.value,
      ets = _ref.ets,
      orderType = _ref.orderType,
      handleCouponType = _ref.handleCouponType,
      bSelected = _ref.bSelected,
      _ref$deductionPrice = _ref.deductionPrice,
      deductionPrice = _ref$deductionPrice === undefined ? 0 : _ref$deductionPrice,
      onClick = _ref.onClick;

  console.clear();
  console.log(deductionPrice);
  return _react2.default.createElement(
    'div',
    { className: 'coupon ' + (deductionPrice == 0 ? 'ineffective' : ''),
      onClick: onClick },
    _react2.default.createElement(
      'div',
      { className: 'block header pos-relative', style: { backgroundImage: 'url(' + (deductionPrice == 0 ? _ineffective2.default : _effective2.default) + ')' } },
      _react2.default.createElement(
        'span',
        { className: 'blod price-layer' },
        handleCouponType(type, discount, value)
      ),
      _react2.default.createElement(
        'span',
        { className: 'fright', style: { width: '68%' } },
        _react2.default.createElement(
          'span',
          { className: 'block white blod', style: { fontSize: ".36rem", padding: '.32rem 0 0  .32rem' } },
          title
        ),
        _react2.default.createElement(
          'span',
          { className: 'block white', style: { fontSize: ".26rem", padding: '.10rem 0 0 .32rem' } },
          subtitle
        ),
        false && _react2.default.createElement(
          'span',
          { className: 'pos-absolute', style: { top: '.40rem', right: '.40rem' } },
          _react2.default.createElement('img', { src: _new2.default, style: { width: '1.60rem' } })
        ),
        bSelected && _react2.default.createElement('img', { className: 'pos-absolute', src: _coupon_choose2.default, style: { top: '40%', right: '.20rem', zIndex: '9', width: '.40rem' } })
      ),
      _react2.default.createElement('img', { src: deductionPrice == 0 ? _ineffective_q2.default : _effective_q2.default, className: 'pos-absolute', style: { width: '1.60rem', bottom: '.12rem', right: 0 } })
    ),
    _react2.default.createElement(
      'div',
      { className: 'block bottom' },
      _react2.default.createElement(
        'span',
        { className: 'date', style: { fontSize: ".28rem" } },
        '\u6709\u6548\u671F\uFF1A' + (0, _moment2.default)('YYYY.MM.DD')(ets * 1000)
      ),
      _react2.default.createElement(
        'span',
        { className: 'fright orange font-s' },
        type.length == 1 ? '立即使用' : ''
      )
    )
  );
};

exports.default = Coupon;