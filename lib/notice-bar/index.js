'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd-mobile/lib/notice-bar/style/css');

var _noticeBar = require('antd-mobile/lib/notice-bar');

var _noticeBar2 = _interopRequireDefault(_noticeBar);

var _css2 = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoticeBarBLM = function NoticeBarBLM(_ref) {
  var _ref$text = _ref.text,
      text = _ref$text === undefined ? '服务商维护如遇无法充值，请稍后再试' : _ref$text;
  return _react2.default.createElement(
    _noticeBar2.default,
    { style: { background: '#fffad8' }, icon: _react2.default.createElement(_icon2.default, { type: require('./notice.svg'), size: 'md' }), marqueeProps: { style: { color: '#333333', marginLeft: '.19rem' } } },
    text
  );
};

exports.default = NoticeBarBLM;