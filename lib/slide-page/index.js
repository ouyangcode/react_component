'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./style/index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlidePage = function SlidePage(_ref) {
  var children = _ref.children,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? 'info' : _ref$type,
      _ref$target = _ref.target,
      target = _ref$target === undefined ? 'right' : _ref$target,
      handleContainerClose = _ref.handleContainerClose,
      _ref$showClose = _ref.showClose,
      showClose = _ref$showClose === undefined ? true : _ref$showClose,
      onClose = _ref.onClose,
      closeComponent = _ref.closeComponent,
      style = _ref.style;

  var node = void 0;
  var onload = function onload(_node) {
    if (_node) {
      node = _node;
      setTimeout(function () {
        node.className = node.className.replace(' hide', '');
      }, 50);
    }
  };
  var onclose = function onclose() {
    node.className += ' hide';
    node.addEventListener("transitionend", function () {
      handleContainerClose();
    });
  };

  return _react2.default.createElement(
    'div',
    { className: 'slide-page-container ' + target + ' ' + type + ' hide',
      ref: onload, style: style },
    children && _react2.default.cloneElement(children, { handleContainerClose: onclose }),
    showClose && _react2.default.createElement(
      'div',
      { className: 'close-container', onClick: onclose },
      closeComponent ? closeComponent : _react2.default.createElement(
        'span',
        { className: 'slide-page-close' },
        '+'
      )
    )
  );
};

exports.default = SlidePage;