'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd-mobile/lib/list/style/css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ic_hui = require('./img/ic_hui.png');

var _ic_hui2 = _interopRequireDefault(_ic_hui);

var _ic_jian = require('./img/ic_jian.png');

var _ic_jian2 = _interopRequireDefault(_ic_jian);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListItem = _list2.default.Item;

var iconStyle = {
  width: '.30rem',
  height: '.30rem',
  marginRight: '.12rem',
  position: 'relative',
  top: '-.02rem'
};

var PromotionDisplay = function PromotionDisplay(_ref) {
  var activity = _ref.activity,
      coupon = _ref.coupon;
  return _react2.default.createElement(
    _list2.default,
    { className: 'no-border' },
    _react2.default.createElement(
      ListItem,
      { extra: _react2.default.createElement(
          'span',
          { className: 'red' },
          '-\uFFE5' + (coupon ? coupon.deductionPrice : 0)
        ) },
      _react2.default.createElement(
        'span',
        { className: 'gray-1' },
        _react2.default.createElement('img', { src: _ic_jian2.default, style: iconStyle }),
        '\u7EA2\u5305\u62B5\u6263'
      )
    ),
    _react2.default.createElement(
      ListItem,
      { extra: _react2.default.createElement(
          'span',
          { className: 'red' },
          '-\uFFE5' + (activity ? activity.deductionPrice : 0)
        ) },
      _react2.default.createElement(
        'span',
        { className: 'gray-1' },
        _react2.default.createElement('img', { src: _ic_hui2.default, style: iconStyle }),
        '\u6D3B\u52A8\u4F18\u60E0'
      )
    )
  );
};
// {
//   activity ? (
//
//   ) : ''
// }
exports.default = PromotionDisplay;