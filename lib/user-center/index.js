'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _always = require('ramda/src/always');

var _always2 = _interopRequireDefault(_always);

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _gt = require('ramda/src/gt');

var _gt2 = _interopRequireDefault(_gt);

var _length = require('ramda/src/length');

var _length2 = _interopRequireDefault(_length);

var _equals = require('ramda/src/equals');

var _equals2 = _interopRequireDefault(_equals);

var _type = require('ramda/src/type');

var _type2 = _interopRequireDefault(_type);

var _both = require('ramda/src/both');

var _both2 = _interopRequireDefault(_both);

var _ifElse = require('ramda/src/ifElse');

var _ifElse2 = _interopRequireDefault(_ifElse);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _stringifyQuery = require('@boluome/common-lib/lib/stringify-query');

var _stringifyQuery2 = _interopRequireDefault(_stringifyQuery);

var _getStore = require('@boluome/common-lib/lib/get-store');

var _getStore2 = _interopRequireDefault(_getStore);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Center = function (_Component) {
  _inherits(Center, _Component);

  function Center(props) {
    _classCallCheck(this, Center);

    var _this = _possibleConstructorReturn(this, (Center.__proto__ || Object.getPrototypeOf(Center)).call(this, props));

    var _window = window,
        _window$OTO_SAAS = _window.OTO_SAAS,
        OTO_SAAS = _window$OTO_SAAS === undefined ? {} : _window$OTO_SAAS;
    var _OTO_SAAS$customer = OTO_SAAS.customer,
        customer = _OTO_SAAS$customer === undefined ? {} : _OTO_SAAS$customer;
    var _customer$showUserCen = customer.showUserCenter,
        showUserCenter = _customer$showUserCen === undefined ? false : _customer$showUserCen;

    _this.state = {
      showUserCenter: showUserCenter
    };
    return _this;
  }
  //当点击时


  _createClass(Center, [{
    key: 'handleClick',
    value: function handleClick() {
      var _props = this.props,
          categoryCode = _props.categoryCode,
          orderTypes = _props.orderTypes;

      var customerUserId = (0, _getStore2.default)('customerUserId', 'session');
      var query = (0, _compose2.default)(_stringifyQuery2.default, (0, _merge2.default)({ customerUserId: customerUserId }))((0, _ifElse2.default)((0, _both2.default)((0, _compose2.default)((0, _equals2.default)('String'), _type2.default), (0, _compose2.default)((0, _gt2.default)(_2.default, 0), _length2.default)), (0, _always2.default)({ orderTypes: orderTypes }), (0, _always2.default)({}))(orderTypes));
      location.href = '/' + categoryCode + '/list' + query;
    }
    //当触摸开始

  }, {
    key: 'handleStart',
    value: function handleStart(e) {
      document.body.style.overflow = 'hidden';
      var _e$touches$ = e.touches[0],
          clientX = _e$touches$.clientX,
          clientY = _e$touches$.clientY;


      this.beginPoint = { clientX: clientX, clientY: clientY };
    }
    //当触摸结束

  }, {
    key: 'handleEnd',
    value: function handleEnd(e) {
      var ct = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      document.body.style.overflow = '';
      var int = this.int;
      var _e$changedTouches$ = e.changedTouches[0],
          clientX = _e$changedTouches$.clientX,
          clientY = _e$changedTouches$.clientY;


      if (Math.abs(this.beginPoint.clientX - clientX) < 50 && Math.abs(this.beginPoint.clientY - clientY) < 50) return;

      var _document$body = document.body,
          offsetHeight = _document$body.offsetHeight,
          offsetWidth = _document$body.offsetWidth;

      var o = this.refs.userCenter;
      var h = int(offsetHeight / 40);
      var w = int(offsetWidth / 2);
      var t = h * 5;

      if (clientY < t) {
        ct = offsetHeight - t;
      } else if (clientY > offsetHeight - offsetHeight * 0.15) {
        ct = '15%';
      } else {
        ct = offsetHeight - Math.round(clientY / h) * h - h / 2;
      }
      o.style.transition = 'all .2s ease';
      o.style.bottom = ct;
      o.style.right = clientX > w ? '8%' : '80%';
      o.addEventListener('transitionend', function () {
        o.style.transition = '';
      });
    }
    //当触摸移动

  }, {
    key: 'handleMove',
    value: function handleMove(e) {
      e.preventDefault();
      var _e$touches$2 = e.touches[0],
          clientX = _e$touches$2.clientX,
          clientY = _e$touches$2.clientY;
      var _document$body2 = document.body,
          offsetHeight = _document$body2.offsetHeight,
          offsetWidth = _document$body2.offsetWidth;

      var o = this.refs.userCenter;
      var s = this.computedStyle(o);
      var height = s.height,
          width = s.width;

      o.style.bottom = offsetHeight - clientY - this.int(height) / 2;
      o.style.right = offsetWidth - clientX - this.int(width) / 2;
    }
  }, {
    key: 'int',
    value: function int(n) {
      return n ? parseInt(n) : 0;
    }
  }, {
    key: 'computedStyle',
    value: function computedStyle(o) {
      return document.defaultView.getComputedStyle(o);
    }
  }, {
    key: 'render',
    value: function render() {
      var showUserCenter = this.state.showUserCenter;

      return _react2.default.createElement(
        'div',
        { ref: 'userCenter', className: 'user-center', style: showUserCenter ? {} : { display: 'none' },
          onTouchMove: this.handleMove.bind(this),
          onTouchStart: this.handleStart.bind(this),
          onTouchEnd: this.handleEnd.bind(this),
          onClick: this.handleClick.bind(this) },
        _react2.default.createElement(_icon2.default, { type: require('./img/center.svg') })
      );
    }
  }]);

  return Center;
}(_react.Component);

exports.default = Center;