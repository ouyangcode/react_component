'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _always = require('ramda/src/always');

var _always2 = _interopRequireDefault(_always);

var _equals = require('ramda/src/equals');

var _equals2 = _interopRequireDefault(_equals);

var _type = require('ramda/src/type');

var _type2 = _interopRequireDefault(_type);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _when = require('ramda/src/when');

var _when2 = _interopRequireDefault(_when);

require('./style/index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mask = require('../mask');

var _mask2 = _interopRequireDefault(_mask);

var _cc = require('./img/cc.gif');

var _cc2 = _interopRequireDefault(_cc);

var _linear = require('./linear');

var _linear2 = _interopRequireDefault(_linear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localStyle = {};

var localImgStyle = {};

var LoadingComponent = function LoadingComponent(_ref) {
  var component = _ref.component,
      _ref$imgSrc = _ref.imgSrc,
      imgSrc = _ref$imgSrc === undefined ? _cc2.default : _ref$imgSrc,
      style = _ref.style,
      imgStyle = _ref.imgStyle;

  localStyle = (0, _when2.default)((0, _compose2.default)((0, _equals2.default)('Object'), _type2.default), (0, _always2.default)((0, _merge2.default)(localStyle, { backgroundColor: 'transparent', textAlign: 'center' })))(component);

  return _react2.default.createElement(
    'div',
    { className: 'loading-container', style: (0, _merge2.default)(localStyle, style) },
    component ? component : _react2.default.createElement('img', { src: imgSrc, style: (0, _merge2.default)(localImgStyle, imgStyle) })
  );
};

var Loading = function Loading() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { maskClosable: false, mask: false };
  return (0, _mask2.default)(_react2.default.createElement(LoadingComponent, options), options);
};

exports.default = Loading;

// <Linear />
// <img src={ imgSrc } style={ merge(localImgStyle, imgStyle) } />