'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd-mobile/lib/list/style/css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _css2 = require('antd-mobile/lib/flex/style/css');

var _flex = require('antd-mobile/lib/flex');

var _flex2 = _interopRequireDefault(_flex);

var _css3 = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _send = require('@boluome/common-lib/lib/send');

var _send2 = _interopRequireDefault(_send);

var _getStore = require('@boluome/common-lib/lib/get-store');

var _getStore2 = _interopRequireDefault(_getStore);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _oto_saas_web_app_component = require('@boluome/oto_saas_web_app_component');

require('./ActivePopup.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActivePopup = function (_Component) {
  _inherits(ActivePopup, _Component);

  function ActivePopup(props) {
    _classCallCheck(this, ActivePopup);

    var _this = _possibleConstructorReturn(this, (ActivePopup.__proto__ || Object.getPrototypeOf(ActivePopup)).call(this, props));

    var _window = window,
        _window$OTO_SAAS = _window.OTO_SAAS,
        OTO_SAAS = _window$OTO_SAAS === undefined ? {} : _window$OTO_SAAS;
    var _OTO_SAAS$customer = OTO_SAAS.customer,
        customer = _OTO_SAAS$customer === undefined ? {} : _OTO_SAAS$customer;
    var _customer$showActiveP = customer.showActivePopup,
        showActivePopup = _customer$showActiveP === undefined ? false : _customer$showActiveP;

    _this.state = {
      promotionBackData: '',
      popupShow: showActivePopup,
      showActivePopup: showActivePopup
    };
    _this.fetchActivity = _this.fetchActivity.bind(_this);
    _this.getPromotionData = _this.getPromotionData.bind(_this);
    _this.handlePopupIconClick = _this.handlePopupIconClick.bind(_this);
    _this.handleClose;
    return _this;
  }

  _createClass(ActivePopup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          orderType = _props.orderType,
          channel = _props.channel,
          amount = _props.amount;

      var postData = {
        userId: (0, _getStore2.default)('customerUserId', 'session'),
        orderType: orderType,
        channel: channel,
        amount: amount,
        target: 'platform',
        count: 1
      };
      amount && this.fetchActivity(postData);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.amount !== nextProps.amount) {
        var orderType = nextProps.orderType,
            channel = nextProps.channel,
            amount = nextProps.amount;

        var postData = {
          userId: (0, _getStore2.default)('customerUserId', 'session'),
          orderType: orderType,
          channel: channel,
          amount: amount,
          target: 'platform',
          count: 1
        };
        if (!parseFloat(amount)) {
          this.setState({ promotionBackData: { target: 'unavailable' } });
          this.closeMask();
          return;
        }
        // amount && this.fetchActivity(postData)
        if (amount) {
          this.fetchActivity(postData);
          this.setState({ popupShow: this.state.showActivePopup });
        }
      }
    }
  }, {
    key: 'fetchActivity',
    value: function fetchActivity(para) {
      var _this2 = this;

      (0, _send2.default)('/promotion/query_promotions', para, { 'Content-Type': 'application/x-www-form-urlencoded' }).then(function (_ref) {
        var code = _ref.code,
            _ref$data = _ref.data,
            data = _ref$data === undefined ? {} : _ref$data,
            message = _ref.message;

        var useMock = false; //是否使用模拟数据的开关，线上改成false
        if (useMock) {
          // 模拟红包数据
          var promotionBackData = {
            target: 'platform', //改变活动类型，共四种："platform","coupon","mixed","unavailable"
            activity: { deductionPrice: 10, title: '活动优惠' },
            coupons: [{ deductionPrice: 10 }]
          };
          _this2.getPromotionData(promotionBackData);
          return;
        }
        if (code === 0) {
          _this2.getPromotionData(data);
        } else {
          // Toast.fail(message)
        }
      });
    }
  }, {
    key: 'getPromotionData',
    value: function getPromotionData(data) {
      var _this3 = this;

      var _props2 = this.props,
          handlePromotionChange = _props2.handlePromotionChange,
          popupStyle = _props2.popupStyle;
      var _state = this.state,
          showActivePopup = _state.showActivePopup,
          popupShow = _state.popupShow;
      var target = data.target,
          activity = data.activity,
          coupons = data.coupons;

      var promotionBackData = {};
      var discountPrice = 0;
      promotionBackData.target = target;
      // 根据target有选择的返回数据（短流程红包，只需要返回第一个数据）
      if (target === 'platform' || target === 'mixed') {
        promotionBackData.activity = activity;
        discountPrice += activity.deductionPrice;
      }
      if (target === 'coupon' || target === 'mixed') {
        promotionBackData.coupons = coupons[0];
        discountPrice += coupons[0].deductionPrice;
      }
      this.setState({ promotionBackData: promotionBackData });
      handlePromotionChange({ discountPrice: discountPrice, promotionBackData: promotionBackData });

      if (target && target !== 'unavailable' && showActivePopup) {
        this.hanldeClose = (0, _oto_saas_web_app_component.Mask)(_react2.default.createElement(ActivityItem, { promotionBackData: promotionBackData, handleCloseIcon: this.handlePopupIconClick }), { style: popupStyle, maskClosable: true, maskClick: function maskClick() {
            _this3.setState({ popupShow: !popupShow });
          } });
      }
    }
  }, {
    key: 'handlePopupIconClick',
    value: function handlePopupIconClick() {
      var _this4 = this;

      var popupStyle = this.props.popupStyle;
      var _state2 = this.state,
          promotionBackData = _state2.promotionBackData,
          popupShow = _state2.popupShow;

      if (popupShow) {
        this.hanldeClose();
        this.setState({ popupShow: !popupShow });
      } else {
        this.hanldeClose = (0, _oto_saas_web_app_component.Mask)(_react2.default.createElement(ActivityItem, { promotionBackData: promotionBackData, handleCloseIcon: this.handlePopupIconClick }), { style: popupStyle, maskClick: function maskClick() {
            _this4.setState({ popupShow: popupShow });
          } });
        this.setState({ popupShow: !popupShow });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state3 = this.state,
          popupShow = _state3.popupShow,
          promotionBackData = _state3.promotionBackData;

      console.log('popupShow', popupShow);
      var target = promotionBackData.target;

      return _react2.default.createElement(
        'div',
        { className: 'acitivity-icon' },
        (target === 'mixed' || target === 'coupon' || target === 'platform') && _react2.default.createElement(_icon2.default, { className: popupShow ? 'active-popup-icon active' : 'active-popup-icon', type: require('./img/arrow.svg'), onClick: this.handlePopupIconClick })
      );
    }
  }]);

  return ActivePopup;
}(_react.Component);

var ActivityItem = function ActivityItem(_ref2) {
  var promotionBackData = _ref2.promotionBackData,
      handleCloseIcon = _ref2.handleCloseIcon;

  var FlexItem = _flex2.default.Item;
  var ListItem = _list2.default.Item;
  var target = promotionBackData.target,
      activity = promotionBackData.activity,
      coupons = promotionBackData.coupons;

  return _react2.default.createElement(
    'div',
    { className: 'active-popup-container' },
    _react2.default.createElement(
      _flex2.default,
      { className: 'header' },
      _react2.default.createElement(
        FlexItem,
        null,
        _react2.default.createElement(_icon2.default, { className: 'left', type: 'cross', color: '#cccccc', size: 'lg', onClick: handleCloseIcon })
      ),
      _react2.default.createElement(
        FlexItem,
        null,
        _react2.default.createElement(
          'p',
          { className: 'center' },
          '\u8BA2\u5355\u786E\u8BA4'
        )
      ),
      _react2.default.createElement(
        FlexItem,
        null,
        _react2.default.createElement(_icon2.default, { className: 'right', type: require('./img/tips.svg'), size: 'lg', style: { display: 'none' } })
      )
    ),
    _react2.default.createElement(
      _list2.default,
      null,
      activity && (target === 'platform' || target === 'mixed') && _react2.default.createElement(
        ListItem,
        { extra: '- \xA5 ' + activity.deductionPrice },
        ' ',
        _react2.default.createElement(
          'span',
          { className: 'ac-icon-style' },
          '\u51CF'
        ),
        activity.title
      ),
      coupons && (target === 'coupon' || target === 'mixed') && _react2.default.createElement(
        ListItem,
        { extra: '- \xA5 ' + coupons.deductionPrice },
        '\u7EA2\u5305\u62B5\u6263'
      )
    )
  );
};

// 开关
// <List.Item extra={<Switch
//     {...getFieldProps('Switch1', {
//       initialValue: true,
//       valuePropName: 'checked',
//       onChange: this.handleChange
//     })}
//   />}
// >默认开</List.Item>

exports.default = ActivePopup;