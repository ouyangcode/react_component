'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd-mobile/lib/date-picker/style/css');

var _datePicker = require('antd-mobile/lib/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _css2 = require('antd-mobile/lib/picker/style/css');

var _picker = require('antd-mobile/lib/picker');

var _picker2 = _interopRequireDefault(_picker);

var _send = require('@boluome/common-lib/lib/send');

var _send2 = _interopRequireDefault(_send);

var _getStore = require('@boluome/common-lib/lib/get-store');

var _getStore2 = _interopRequireDefault(_getStore);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _clone = require('ramda/src/clone');

var _clone2 = _interopRequireDefault(_clone);

var _css3 = require('antd-mobile/lib/toast/style/css');

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _css4 = require('antd-mobile/lib/list/style/css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./style/index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _oto_saas_web_app_component = require('@boluome/oto_saas_web_app_component');

var _loading = require('../loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = _list2.default.Item;

var AddTourist = function (_React$Component) {
  _inherits(AddTourist, _React$Component);

  function AddTourist(props) {
    _classCallCheck(this, AddTourist);

    var _this = _possibleConstructorReturn(this, (AddTourist.__proto__ || Object.getPrototypeOf(AddTourist)).call(this, props));

    var editContact = props.editContact;

    console.log('editContact-----', editContact);
    _this.edit = false;
    if (editContact && editContact.id) {
      _this.state = _extends({}, editContact);
      _this.edit = true;
    } else {
      _this.state = {
        id: '',
        type: 0,
        bornDate: '',
        cardType: '',
        name: '',
        phone: '',
        idCard: '',
        status: '',
        identityId: '',
        isDefault: false
      };
    }
    return _this;
  }

  _createClass(AddTourist, [{
    key: 'handleToggleContactForm',
    value: function handleToggleContactForm(bContactFormShow) {
      this.setState({ bContactFormShow: bContactFormShow });
    }
  }, {
    key: 'handleTypeChange',
    value: function handleTypeChange(type) {
      this.setState({ type: type });
    }
  }, {
    key: 'handlePhoneChange',
    value: function handlePhoneChange(phone) {
      this.setState({ phone: phone });
    }
  }, {
    key: 'handleNameChange',
    value: function handleNameChange(name) {
      this.setState({ name: name });
    }
  }, {
    key: 'handBornDateChange',
    value: function handBornDateChange(bornDate) {
      this.setState({ bornDate: bornDate });
    }
  }, {
    key: 'handleIdCardChange',
    value: function handleIdCardChange(idCard) {
      console.log('handleidCardChange---=', idCard);
      var birthday = "";
      if (idCard != null && idCard != "") {
        if (idCard.length == 15) {
          birthday = "19" + idCard.substr(6, 6);
        } else if (idCard.length == 18) {
          birthday = idCard.substr(6, 8);
        }

        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
      }

      // return birthday;
      console.log('birthday---', birthday);
      this.setState({ idCard: idCard });
      this.handBornDateChange(birthday);
    }
  }, {
    key: 'handleSaveTourist',
    value: function handleSaveTourist() {
      var _this2 = this;

      var _state = this.state,
          id = _state.id,
          type = _state.type,
          phone = _state.phone,
          name = _state.name,
          bornDate = _state.bornDate,
          cardType = _state.cardType,
          idCard = _state.idCard,
          status = _state.status,
          identityId = _state.identityId,
          isDefault = _state.isDefault;
      var onSuccess = this.props.onSuccess;

      if (!name) {
        _toast2.default.info('请填写姓名');
        return;
      }
      if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(phone)) {
        _toast2.default.info('请填写正确手机');
        return;
      }
      if (!cardType) {
        _toast2.default.info('请选择证件类型');
        return;
      }
      if (!idCard) {
        _toast2.default.info('请填写证件号码');
        return;
      }
      if (!bornDate) {
        _toast2.default.info('请填选择出生日期');
        return;
      }
      var postData = {};
      if (id) {
        postData = (0, _clone2.default)(this.state);
      } else {
        postData = (0, _merge2.default)(this.state, _extends({}, (0, _getStore2.default)('geopoint', 'session'), {
          userId: (0, _getStore2.default)('customerUserId', 'session')
        }));
      }

      delete postData.districts;
      delete postData.bAddressSearchShow;

      var handleClose = (0, _loading2.default)();
      (0, _send2.default)('/user/v1/identity', postData, id ? 'put' : 'post').then(function (_ref) {
        var code = _ref.code,
            data = _ref.data,
            message = _ref.message;

        if (code === 0) {
          _this2.handleSuccess();
        } else {
          console.log(message);
        }
        handleClose();
      });
    }
  }, {
    key: 'handleSuccess',
    value: function handleSuccess() {
      var _props = this.props,
          onSuccess = _props.onSuccess,
          handleContainerClose = _props.handleContainerClose;

      onSuccess();
      handleContainerClose();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // const { geoPoint } = this.state
      // this.handleDatefn()
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var seasons = [[{
        label: '身份证',
        value: '身份证'
      }, {
        label: '护照',
        value: '护照'
      }]];
      var maxDate = (0, _moment2.default)('2016-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
      var minDate = (0, _moment2.default)('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

      // 如果是修改常用旅客信息
      var _state2 = this.state,
          id = _state2.id,
          type = _state2.type,
          phone = _state2.phone,
          name = _state2.name,
          bornDate = _state2.bornDate,
          cardType = _state2.cardType,
          idCard = _state2.idCard,
          status = _state2.status,
          identityId = _state2.identityId,
          isDefault = _state2.isDefault;

      return _react2.default.createElement(
        'div',
        { className: 'addtouristWrap' },
        _react2.default.createElement(
          'div',
          { className: 'addtouristMain' },
          _react2.default.createElement(
            _list2.default,
            null,
            _react2.default.createElement(
              Item,
              null,
              _react2.default.createElement(
                'span',
                { className: 'addtitle' },
                '\u7C7B\u578B'
              ),
              _react2.default.createElement(
                'span',
                { className: 'add_oto' },
                '\u6210\u4EBA'
              ),
              _react2.default.createElement(
                'span',
                { className: 'add_oto' },
                '\u513F\u7AE5'
              ),
              _react2.default.createElement(
                'span',
                { className: 'add_oto' },
                '\u5A74\u513F'
              )
            ),
            _react2.default.createElement(
              Item,
              null,
              _react2.default.createElement(
                'span',
                { className: 'wp30 inline-block' },
                '\u59D3\u540D'
              ),
              _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement('input', { type: 'text', placeholder: '\u8BF7\u8F93\u5165\u59D3\u540D', value: name, onChange: function onChange(e) {
                    return _this3.handleNameChange(e.target.value);
                  }, className: 'wp70 no-border' })
              )
            ),
            _react2.default.createElement(
              Item,
              null,
              _react2.default.createElement(
                'span',
                { className: 'wp30 inline-block' },
                '\u624B\u673A\u53F7'
              ),
              _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement('input', { type: 'tel', maxLength: '11', placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7', value: phone, onChange: function onChange(e) {
                    return _this3.handlePhoneChange(e.target.value);
                  }, className: 'wp70 no-border' })
              )
            ),
            _react2.default.createElement(
              _picker2.default,
              {
                data: seasons,
                title: '\u8BC1\u4EF6\u7C7B\u578B',
                extra: cardType ? cardType : '身份证',
                cols: '1',
                value: this.state.dpValue,
                onChange: function onChange(v) {
                  return _this3.setState({ dpValue: v });
                }
              },
              _react2.default.createElement(
                Item,
                { className: 'card', arrow: 'horizontal' },
                '\u8BC1\u4EF6\u7C7B\u578B'
              )
            ),
            _react2.default.createElement(
              Item,
              null,
              _react2.default.createElement(
                'span',
                { className: 'wp30 inline-block' },
                '\u8BC1\u4EF6\u53F7\u7801'
              ),
              _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement('input', { type: 'number', maxLength: '19', placeholder: '\u8BF7\u8F93\u5165\u8BC1\u4EF6\u53F7\u7801', value: idCard, onChange: function onChange(e) {
                    return _this3.handleIdCardChange(e.target.value);
                  }, className: 'wp70 no-border' })
              )
            ),
            _react2.default.createElement(
              _datePicker2.default,
              {
                mode: 'date',
                title: '\u51FA\u751F\u5E74\u6708',
                extra: bornDate ? bornDate : '1990-01-01',
                value: this.state.dpValue,
                format: function format(values) {
                  return values.join(',');
                },
                minDate: minDate,
                maxDate: maxDate,
                onChange: function onChange(v) {
                  return _this3.handBornDateChange(v);
                }
              },
              _react2.default.createElement(
                _list2.default.Item,
                { arrow: 'horizontal', className: 'born' },
                '\u51FA\u751F\u5E74\u6708'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'SaveBtn', onClick: function onClick() {
                return _this3.handleSaveTourist();
              } },
            '\u4FDD\u5B58'
          )
        )
      );
    }
  }]);

  return AddTourist;
}(_react2.default.Component);

exports.default = AddTourist;