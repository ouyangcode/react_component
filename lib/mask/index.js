'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('./style/index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mask = function Mask(content, options) {
  var body = document.body;
  var node = document.createElement('div');
  node.className += ' my-mask'; //暴露出一个class名，方便点击组件外dom，实现关闭当前遮罩
  var preventDefaul = function preventDefaul(e) {
    return e.preventDefault();
  };
  var handleContainerClose = function handleContainerClose() {
    (0, _reactDom.unmountComponentAtNode)(node);
    node.remove();
    document.documentElement.style.overflow = '';
  };

  document.documentElement.style.overflow = 'hidden';
  body.appendChild(node);
  (0, _reactDom.render)(_react2.default.createElement(
    MaskContainer,
    _extends({ handleContainerClose: handleContainerClose }, options),
    _react2.default.cloneElement(content, { handleContainerClose: handleContainerClose })
  ), node);
  return handleContainerClose;
};

var localMaskContainerStyle = {};
var localMaskStyle = {};
var localContentStyle = {};
var defultMaskClick = function defultMaskClick() {};

var bgWhite = { backgroundColor: '#000' };

// maskClick: 点击遮罩时触发的事件
var MaskContainer = function MaskContainer(_ref) {
  var children = _ref.children,
      handleContainerClose = _ref.handleContainerClose,
      _ref$maskClick = _ref.maskClick,
      maskClick = _ref$maskClick === undefined ? defultMaskClick : _ref$maskClick,
      _ref$mask = _ref.mask,
      mask = _ref$mask === undefined ? true : _ref$mask,
      _ref$maskClosable = _ref.maskClosable,
      maskClosable = _ref$maskClosable === undefined ? true : _ref$maskClosable,
      _ref$maskPosition = _ref.maskPosition,
      maskPosition = _ref$maskPosition === undefined ? 'fixed' : _ref$maskPosition,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$maskStyle = _ref.maskStyle,
      maskStyle = _ref$maskStyle === undefined ? {} : _ref$maskStyle,
      contentStyle = _ref.contentStyle;
  return _react2.default.createElement(
    'div',
    { className: 'mask-container', style: (0, _merge2.default)(localMaskContainerStyle, style) },
    _react2.default.createElement('div', { className: 'mask',
      ref: function ref(node) {
        return node && setTimeout(function () {
          node.className += ' fade-in';
        }, 50);
      },
      onClick: maskClosable ? (0, _compose2.default)(handleContainerClose, maskClick) : '',
      onTouchMove: function onTouchMove(e) {
        return e.preventDefault();
      },
      style: !mask ? (0, _merge2.default)(localMaskStyle, maskStyle) : (0, _compose2.default)((0, _merge2.default)(localMaskStyle), (0, _merge2.default)(bgWhite))(maskStyle) }),
    _react2.default.createElement(
      'div',
      { className: 'content', style: (0, _merge2.default)(localContentStyle, contentStyle) },
      children
    )
  );
};

exports.default = Mask;