'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd-mobile/lib/modal/style/css');

var _modal = require('antd-mobile/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css2 = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PayTips = function (_React$Component) {
  _inherits(PayTips, _React$Component);

  function PayTips(props) {
    _classCallCheck(this, PayTips);

    var _this = _possibleConstructorReturn(this, (PayTips.__proto__ || Object.getPrototypeOf(PayTips)).call(this, props));

    _this.state = {
      showModal: false
    };
    _this.showModal = _this.showModal.bind(_this);
    return _this;
  }

  _createClass(PayTips, [{
    key: 'showModal',
    value: function showModal(b) {
      this.setState({ showModal: b });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var textStyle = {
        height: '5.54rem',
        overflow: 'auto',
        textAlign: 'left',
        fontSize: '.24rem',
        color: '#999999',
        lineHeight: '.36rem'
      };
      var tipStyle = {
        fontSize: '.24rem',
        color: '#ffab00',
        float: 'left',
        lineHeight: '.70rem'
      };
      var iconStyle = {
        float: 'left',
        marginTop: '.19rem',
        marginRight: '.1rem',
        marginLeft: '.3rem'
      };

      var _props = this.props,
          title = _props.title,
          content = _props.content;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: { overflow: 'hidden', clear: 'both' } },
          _react2.default.createElement(_icon2.default, { style: iconStyle, type: require('./payTips.svg'), size: 'xxs' }),
          _react2.default.createElement(
            'p',
            { style: tipStyle, onClick: function onClick() {
                return _this2.showModal(true);
              } },
            '\u7F34\u8D39\u8BF4\u660E'
          )
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            title: title,
            className: 'pay-tips',
            transparent: true,
            maskClosable: false,
            visible: this.state.showModal,
            onClose: function onClose() {
              return _this2.showModal(false);
            },
            footer: [{ text: '我知道了', onPress: function onPress() {
                return _this2.showModal(false);
              } }],
            style: { width: '6.9rem', height: '9rem' }
          },
          _react2.default.createElement(
            'div',
            { style: textStyle },
            content
          )
        )
      );
    }
  }]);

  return PayTips;
}(_react2.default.Component);

exports.default = PayTips;