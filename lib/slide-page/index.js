'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./style/index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slidePageList = [];

var closeSlidePage = function closeSlidePage(slidePages) {
  if (slidePages.length > 0) {
    slidePages.shift().onclose();
    closeSlidePage(slidePages);
  }
};

var matchHashWithSlidePage = function matchHashWithSlidePage() {
  closeSlidePage(slidePageList.filter(function (o) {
    return location.hash.indexOf(o.hash) < 0;
  }));
  refreshSlidePageList();
};
var refreshSlidePageList = function refreshSlidePageList() {
  slidePageList = slidePageList.filter(function (o) {
    return location.hash.indexOf(o.hash) >= 0;
  });
};

var SlidePage = function SlidePage(_ref) {
  var children = _ref.children,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? 'info' : _ref$type,
      _ref$target = _ref.target,
      target = _ref$target === undefined ? 'right' : _ref$target,
      handleContainerClose = _ref.handleContainerClose,
      _ref$showHash = _ref.showHash,
      showHash = _ref$showHash === undefined ? true : _ref$showHash,
      _ref$showClose = _ref.showClose,
      showClose = _ref$showClose === undefined ? true : _ref$showClose,
      closeComponent = _ref.closeComponent,
      style = _ref.style;

  var hash = Date.now();
  var node = void 0;
  var onclose = function onclose() {
    if (showHash) {
      var _hash = node.getAttribute('data-id');
      if (location.hash.indexOf(_hash) >= 0) history.go(-1);
    }
    node.className += ' hide';
    node.addEventListener("transitionend", function () {
      handleContainerClose();
      setTimeout(refreshSlidePageList, 0);
    });
  };

  var onload = function onload(_node) {
    if (_node) {
      node = _node;
      if (showHash) {
        node.setAttribute('data-id', hash);
        location.hash += hash;
        slidePageList.push({ node: node, hash: hash, onclose: onclose });
      }
      setTimeout(function () {
        node.className = node.className.replace(' hide', '');
      }, 50);
    }
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

window.addEventListener('hashchange', function () {
  matchHashWithSlidePage();
}, false);

exports.default = SlidePage;