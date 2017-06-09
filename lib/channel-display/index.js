'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getStore = require('@boluome/common-lib/lib/get-store');

var _getStore2 = _interopRequireDefault(_getStore);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./style/index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChannelDisplay = function (_Component) {
  _inherits(ChannelDisplay, _Component);

  function ChannelDisplay(props) {
    _classCallCheck(this, ChannelDisplay);

    var _this = _possibleConstructorReturn(this, (ChannelDisplay.__proto__ || Object.getPrototypeOf(ChannelDisplay)).call(this, props));

    _this.state = {
      services: (0, _getStore2.default)('customerConfig', 'session').services,
      chooseIndex: 0
    };
    return _this;
  }

  _createClass(ChannelDisplay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var services = this.state.services;
      var _props = this.props,
          categoryCode = _props.categoryCode,
          onChange = _props.onChange;

      services.map(function (item, index) {
        if (item.categoryCode === categoryCode) {
          _this2.setState({ currentServer: item });
          onChange(item);
        }
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(result, index) {
      var onChange = this.props.onChange;

      this.setState({ chooseIndex: index });
      onChange(result);
      this.props.handleContainerClose();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          _state$currentServer = _state.currentServer,
          currentServer = _state$currentServer === undefined ? {} : _state$currentServer,
          chooseIndex = _state.chooseIndex;
      var _currentServer$brands = currentServer.brands,
          brands = _currentServer$brands === undefined ? [] : _currentServer$brands;


      return _react2.default.createElement(
        'div',
        { className: 'channelContainer' },
        _react2.default.createElement(
          'ul',
          null,
          brands && brands.length > 1 ? brands.map(function (item, index) {
            return _react2.default.createElement(
              'li',
              { key: '' + index, className: chooseIndex === index ? 'chooseChannel' : '',
                onClick: function onClick() {
                  return _this3.handleClick(item, index);
                } },
              _react2.default.createElement('img', { src: item.iconUrl }),
              _react2.default.createElement(
                'span',
                null,
                item.brandName
              )
            );
          }) : ''
        )
      );
    }
  }]);

  return ChannelDisplay;
}(_react.Component);

exports.default = ChannelDisplay;