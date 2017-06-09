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

var _reactDom = require('react-dom');

var _oto_saas_web_app_component = require('@boluome/oto_saas_web_app_component');

var _rcForm = require('rc-form');

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

    _this.state = {
      promotionBackData: {},
      popupShow: false
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.fetchActivity = _this.fetchActivity.bind(_this);
    _this.getPromotionData = _this.getPromotionData.bind(_this);
    _this.handlePopupClick = _this.handlePopupClick.bind(_this);
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
        amount && this.fetchActivity(postData);
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

        var useMock = true; //是否使用模拟数据的开关，线上改成false
        if (useMock) {
          // 模拟红包数据
          var promotionBackData = {
            activityType: 'platform', //改变活动类型，共四种："platform","coupon","mixed","unavailable"
            activity: { deductionPrice: 10, title: '活动优惠' },
            coupons: [{ deductionPrice: 10 }]
          };
          _this2.setState({ promotionBackData: promotionBackData });
          _this2.getPromotionData();
          return;
        }

        if (code === 0) {
          data.activityType = data.target;
          _this2.setState({ promotionBackData: data });
          _this2.getPromotionData();
        } else {
          // Toast.fail(message)
          console.log(message);
        }
      });
    }
  }, {
    key: 'getPromotionData',
    value: function getPromotionData() {
      var _this3 = this;

      var handlePromotionChange = this.props.handlePromotionChange;
      var promotionBackData = this.state.promotionBackData;
      var _props2 = this.props,
          popupStyle = _props2.popupStyle,
          defaultShow = _props2.defaultShow;
      var activityType = promotionBackData.activityType,
          activity = promotionBackData.activity,
          coupons = promotionBackData.coupons;

      var discountPrice = 0;
      if (activityType === 'platform' || activityType === 'mixed') {
        discountPrice += activity.deductionPrice;
      }

      if (activityType === 'coupon' || activityType === 'mixed') {
        discountPrice += coupons[0].deductionPrice;
      }
      handlePromotionChange({ discountPrice: discountPrice, promotionBackData: promotionBackData });

      if (activityType !== 'unavailable' && defaultShow) {
        (0, _oto_saas_web_app_component.Mask)(_react2.default.createElement(ActivityItem, { activityType: activityType, activity: activity, coupons: coupons }), { style: popupStyle, maskClick: function maskClick() {
            _this3.setState({ popupShow: _this3.state.popupShow });
          } });
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(res) {
      // this.props.handleSwitchChange(res)
    }
  }, {
    key: 'handlePopupClick',
    value: function handlePopupClick() {
      var _this4 = this;

      var popupStyle = this.props.popupStyle;
      var _state$promotionBackD = this.state.promotionBackData,
          activityType = _state$promotionBackD.activityType,
          activity = _state$promotionBackD.activity,
          coupons = _state$promotionBackD.coupons;

      var maskNode = document.querySelector('.my-mask');
      this.setState({ popupShow: !this.state.popupShow });
      var closeMask = function closeMask() {
        (0, _reactDom.unmountComponentAtNode)(maskNode);
        maskNode.remove();
        document.documentElement.style.overflow = '';
      };
      if (maskNode) {
        closeMask();
      } else {
        (0, _oto_saas_web_app_component.Mask)(_react2.default.createElement(ActivityItem, { activityType: activityType, activity: activity, coupons: coupons, handleCloseIcon: this.handlePopupClick }), { style: popupStyle, maskClick: function maskClick() {
            _this4.setState({ popupShow: !_this4.state.popupShow });
          } });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var form = this.props.form;
      var popupShow = this.state.popupShow;
      var getFieldProps = form.getFieldProps;
      var activityType = this.state.promotionBackData.activityType;

      return _react2.default.createElement(
        'div',
        { className: 'acitivity-icon' },
        (activityType === 'mixed' || activityType === 'coupon' || activityType === 'platform') && _react2.default.createElement(_icon2.default, { className: popupShow ? 'active-popup-icon active' : 'active-popup-icon', type: require('./img/arrow.svg'), onClick: this.handlePopupClick })
      );
    }
  }]);

  return ActivePopup;
}(_react.Component);

var ActivityItem = function ActivityItem(_ref2) {
  var activityType = _ref2.activityType,
      activity = _ref2.activity,
      coupons = _ref2.coupons,
      handleCloseIcon = _ref2.handleCloseIcon;

  var FlexItem = _flex2.default.Item;
  var ListItem = _list2.default.Item;

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
      activity && (activityType === 'platform' || activityType === 'mixed') && _react2.default.createElement(
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
      coupons && (activityType === 'coupon' || activityType === 'mixed') && _react2.default.createElement(
        ListItem,
        { extra: '- \xA5 ' + coupons[0].deductionPrice },
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

exports.default = (0, _rcForm.createForm)()(ActivePopup);