'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _slidePage = require('../slide-page');

var _slidePage2 = _interopRequireDefault(_slidePage);

var _mask = require('../mask');

var _mask2 = _interopRequireDefault(_mask);

var _loading = require('../loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = function (_Component) {
  _inherits(Empty, _Component);

  function Empty(props) {
    _classCallCheck(this, Empty);

    var _this = _possibleConstructorReturn(this, (Empty.__proto__ || Object.getPrototypeOf(Empty)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Empty, [{
    key: 'componentWillMount',
    value: function componentWillMount(props) {}
  }, {
    key: 'handleImgLoaded',
    value: function handleImgLoaded() {
      var content = this.refs.content;
      // console.log(content)

      var h = parseInt(document.defaultView.getComputedStyle(content).height);
      var dh = parseInt(document.defaultView.getComputedStyle(document.body, null).height);
      content.style.top = (dh - h) / 2 + 'px';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          imgUrl = _props.imgUrl,
          title = _props.title,
          message = _props.message,
          button = _props.button;

      // console.log(imgUrl);
      // let reg = new RegExp(/\./g)

      return _react2.default.createElement(
        'div',
        { className: 'empty-container', style: this.props.style },
        _react2.default.createElement(
          'div',
          { className: 'empty-content', ref: 'content' },
          imgUrl.constructor == String ? _react2.default.createElement('img', { src: imgUrl, onLoad: function onLoad() {
              return _this2.handleImgLoaded();
            } }) : imgUrl,
          title ? _react2.default.createElement(
            'h3',
            { className: 'title' },
            title
          ) : '',
          _react2.default.createElement(
            'p',
            { className: 'message' },
            message
          ),
          button ? button : ''
        )
      );
    }
  }]);

  return Empty;
}(_react.Component);

exports.default = Empty;