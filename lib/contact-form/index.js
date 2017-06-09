'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd-mobile/lib/switch/style/css');

var _switch = require('antd-mobile/lib/switch');

var _switch2 = _interopRequireDefault(_switch);

var _css2 = require('antd-mobile/lib/picker/style/css');

var _picker = require('antd-mobile/lib/picker');

var _picker2 = _interopRequireDefault(_picker);

var _css3 = require('antd-mobile/lib/white-space/style/css');

var _whiteSpace = require('antd-mobile/lib/white-space');

var _whiteSpace2 = _interopRequireDefault(_whiteSpace);

var _setStore = require('@boluome/common-lib/lib/set-store');

var _setStore2 = _interopRequireDefault(_setStore);

var _get = require('@boluome/common-lib/lib/get');

var _get2 = _interopRequireDefault(_get);

var _send = require('@boluome/common-lib/lib/send');

var _send2 = _interopRequireDefault(_send);

var _getStore = require('@boluome/common-lib/lib/get-store');

var _getStore2 = _interopRequireDefault(_getStore);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _clone = require('ramda/src/clone');

var _clone2 = _interopRequireDefault(_clone);

var _css4 = require('antd-mobile/lib/toast/style/css');

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _css5 = require('antd-mobile/lib/list/style/css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loading = require('../loading');

var _loading2 = _interopRequireDefault(_loading);

var _addressSearch = require('../address-search');

var _addressSearch2 = _interopRequireDefault(_addressSearch);

var _slidePage = require('../slide-page');

var _slidePage2 = _interopRequireDefault(_slidePage);

var _mask = require('../mask');

var _mask2 = _interopRequireDefault(_mask);

var _choose = require('./img/choose.png');

var _choose2 = _interopRequireDefault(_choose);

var _nochoose = require('./img/nochoose.png');

var _nochoose2 = _interopRequireDefault(_nochoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = _list2.default.Item;

// 百度根据城市名获取坐标
var baiduGetLocation = function baiduGetLocation(cityName, callback) {
  var myGeo = new BMap.Geocoder(); //构造函数
  myGeo.getPoint(cityName, function (point) {

    callback(point);
  });
};
// 改变逆向城市名称
var gethasLocation = function gethasLocation(mPoint, callback) {
  var myGeo = new BMap.Geocoder();
  myGeo.getLocation(mPoint, function mCallback(rs) {
    console.log(rs);
    var rightCity = rs.addressComponents;
    callback(rightCity);
  });
};

var CustomerForm = function (_Component) {
  _inherits(CustomerForm, _Component);

  function CustomerForm(props) {
    _classCallCheck(this, CustomerForm);

    var _this = _possibleConstructorReturn(this, (CustomerForm.__proto__ || Object.getPrototypeOf(CustomerForm)).call(this, props));

    var editContact = props.editContact;

    _this.edit = false;
    if (editContact && editContact.contactId) {
      _this.state = _extends({}, editContact);
      _this.edit = true;
    } else {
      _this.state = {
        contactId: '',
        gender: 0,
        phone: '',
        name: '',
        detail: '',
        address: '',
        tag: '',
        isDefault: false
      };
    }
    // this.provinceArr = []
    // this.cityArr   = []
    // this.countyArr = []

    console.log(editContact);
    return _this;
  }

  _createClass(CustomerForm, [{
    key: 'handleToggleContactForm',
    value: function handleToggleContactForm(bContactFormShow) {
      this.setState({ bContactFormShow: bContactFormShow });
    }
  }, {
    key: 'handleGenderChange',
    value: function handleGenderChange(gender) {
      this.setState({ gender: gender });
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
    key: 'handleAddrDetailChange',
    value: function handleAddrDetailChange(detail) {
      console.log('handleAddrDetailChange---=', detail);
      this.setState({ detail: detail });
    }
  }, {
    key: 'handleAddressChange',
    value: function handleAddressChange(location) {
      var _this2 = this;

      console.log('woxiangyaogaibian---=', location);
      var point = location.point,
          title = location.title,
          address = location.address;

      gethasLocation(location.point, function (rightCity) {
        console.log('rightCity', rightCity);
        _this2.handleChangeArea(rightCity.province, rightCity.city, rightCity.county, true);
      });
      this.setState({
        longitude: point.lng,
        latitude: point.lat,
        address: title
      });
      //this.handleToggleAddressSearchShow(false)
      this.handleAddrDetailChange(address);
      // this.setState({ address })
    }
  }, {
    key: 'handleTagChange',
    value: function handleTagChange(tag) {
      if (tag === '无') tag = '';
      this.setState({ tag: tag });
    }
  }, {
    key: 'handleDefaultChange',
    value: function handleDefaultChange(isDefault) {
      this.setState({ isDefault: isDefault });
    }
  }, {
    key: 'handleSaveContact',
    value: function handleSaveContact() {
      var _this3 = this;

      var _state = this.state,
          contactId = _state.contactId,
          gender = _state.gender,
          phone = _state.phone,
          name = _state.name,
          detail = _state.detail,
          address = _state.address,
          tag = _state.tag,
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
      if (!address) {
        _toast2.default.info('请选择地址');
        return;
      }
      if (!detail) {
        _toast2.default.info('请填写详细地址');
        return;
      }
      var postData = {};
      if (contactId) {
        postData = (0, _clone2.default)(this.state);
      } else {
        postData = (0, _merge2.default)(this.state, _extends({}, (0, _getStore2.default)('geopoint', 'session'), {
          userId: (0, _getStore2.default)('customerUserId', 'session')
        }));
      }

      delete postData.districts;
      delete postData.bAddressSearchShow;

      var handleClose = (0, _loading2.default)();
      (0, _send2.default)('/user/v1/contact', postData, contactId ? 'put' : 'post').then(function (_ref) {
        var code = _ref.code,
            data = _ref.data,
            message = _ref.message;

        if (code === 0) {
          _this3.handleSuccess();
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
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.fetchAreas();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.fetchAreas();
    }
    // filterAreaById (province, city, county) {
    //   const { provinceArr, cityArr, countyArr } = this.state
    //   //let arr = []
    //
    //   districts.reduce((arr, current) => {
    //
    //   })
    // }

  }, {
    key: 'fetchAreas',
    value: function fetchAreas() {
      var _this4 = this;

      var handleClose = (0, _loading2.default)();
      (0, _get2.default)('/basis/v1/areas').then(function (_ref2) {
        var code = _ref2.code,
            data = _ref2.data,
            message = _ref2.message;

        if (code === 0) {
          _this4.setState({
            districts: data.map(function (_ref3) {
              var id = _ref3.id,
                  name = _ref3.name,
                  city = _ref3.city;

              return {
                value: id,
                label: name,
                children: city.map(function (_ref4) {
                  var id = _ref4.id,
                      name = _ref4.name,
                      county = _ref4.county;

                  return {
                    value: id,
                    label: name,
                    children: county.map(function (_ref5) {
                      var id = _ref5.id,
                          name = _ref5.name;

                      return {
                        value: id,
                        label: name
                      };
                    })
                  };
                })
              };
            })
          });
          if (!_this4.edit) {
            var _ref6 = (0, _getStore2.default)('currentPosition', 'session') || {},
                _ref6$province = _ref6.province,
                province = _ref6$province === undefined ? '' : _ref6$province,
                _ref6$city = _ref6.city,
                city = _ref6$city === undefined ? '' : _ref6$city,
                _ref6$district = _ref6.district,
                district = _ref6$district === undefined ? '' : _ref6$district;

            _this4.handleChangeArea(province, city, district);
          } else {
            console.log('我换地方了');
          }
        } else {
          console.log(message);
        }
        handleClose();
      });
    }
  }, {
    key: 'handleChangeArea',
    value: function handleChangeArea(province, city, county, mark) {
      var _this5 = this;

      var _state$districts = this.state.districts,
          districts = _state$districts === undefined ? [] : _state$districts;

      console.log(districts);
      var provinceObj = districts.filter(function (d) {
        return province === d.label || province === d.value;
      })[0] || {};
      var cityObj = void 0;
      var countyObj = void 0;

      if (provinceObj && provinceObj.children) {
        cityObj = provinceObj.children.filter(function (c) {
          return city === c.label || city === c.value;
        })[0] || {};
      }
      if (cityObj && cityObj.children) {
        countyObj = cityObj.children.filter(function (c) {
          return county === c.label || county === c.value;
        })[0] || {};
      }
      if (countyObj && !countyObj.value && cityObj.children) {
        countyObj = cityObj.children[0];
      }
      if (provinceObj && cityObj && countyObj) {
        console.log(provinceObj.label + cityObj.label + countyObj.label);
        baiduGetLocation('' + provinceObj.label + cityObj.label + countyObj.label, function (point) {

          _this5.setState({
            latitude: point ? point.lat : '',
            longitude: point ? point.lng : ''

          });
          if (mark) {
            console.log('我是逆向选择');
          } else {
            _this5.setState({
              detail: '',
              address: ''
            });
          }
          (0, _setStore2.default)('goBackPoint', point, 'session');
        });

        this.setState({
          province: provinceObj.label,
          provinceId: provinceObj.value,
          city: cityObj.label,
          cityId: cityObj.value,
          county: countyObj.label,
          countyId: countyObj.value
        });
      } else {
        _toast2.default.fail('请先定位');
      }
    }
  }, {
    key: 'handleToggleAddressSearchShow',
    value: function handleToggleAddressSearchShow() {
      var _state2 = this.state,
          longitude = _state2.longitude,
          latitude = _state2.latitude,
          address = _state2.address;


      (0, _mask2.default)(_react2.default.createElement(
        _slidePage2.default,
        { target: 'right', type: 'root' },
        _react2.default.createElement(_addressSearch2.default, _extends({ address: address, longitude: longitude, latitude: latitude }, {
          onSuccess: this.handleAddressChange.bind(this) }))
      ), { mask: false, style: { position: 'absolute' } });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _state3 = this.state,
          gender = _state3.gender,
          phone = _state3.phone,
          name = _state3.name,
          detail = _state3.detail,
          address = _state3.address,
          tag = _state3.tag,
          isDefault = _state3.isDefault,
          loading = _state3.loading,
          bAddressSearchShow = _state3.bAddressSearchShow,
          longitude = _state3.longitude,
          latitude = _state3.latitude,
          districts = _state3.districts,
          contatId = _state3.contatId,
          _state3$province = _state3.province,
          province = _state3$province === undefined ? '' : _state3$province,
          _state3$city = _state3.city,
          city = _state3$city === undefined ? '' : _state3$city,
          _state3$county = _state3.county,
          county = _state3$county === undefined ? '' : _state3$county,
          provinceId = _state3.provinceId,
          cityId = _state3.cityId,
          countyId = _state3.countyId;
      //console.log(provinceId, cityId, countyId)

      return _react2.default.createElement(
        'div',
        { className: 'touch-layer hp100' },
        _react2.default.createElement(
          _list2.default,
          null,
          _react2.default.createElement(
            ListItem,
            null,
            _react2.default.createElement(
              'div',
              { className: 'tcenter black font-x' },
              this.edit ? '编辑' : '新增',
              '\u6536\u8D27\u5730\u5740'
            )
          )
        ),
        _react2.default.createElement(_whiteSpace2.default, { size: 'lg' }),
        _react2.default.createElement(
          _list2.default,
          null,
          _react2.default.createElement(
            ListItem,
            null,
            _react2.default.createElement(
              'span',
              { className: 'wp20 inline-block' },
              '\u6536\u8D27\u4EBA'
            ),
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement('input', { type: 'text', placeholder: '\u8BF7\u586B\u5199\u6536\u8D27\u4EBA\u7684\u59D3\u540D', value: name, onChange: function onChange(e) {
                  return _this6.handleNameChange(e.target.value);
                }, className: 'wp80 no-border' })
            )
          ),
          _react2.default.createElement(
            ListItem,
            null,
            _react2.default.createElement(
              'span',
              { className: 'wp20 inline-block' },
              '\u79F0\u547C'
            ),
            _react2.default.createElement(
              'label',
              { className: 'tmr', onClick: function onClick() {
                  return _this6.handleGenderChange(0);
                } },
              _react2.default.createElement('img', { src: gender ? _nochoose2.default : _choose2.default, style: iconStyle }),
              _react2.default.createElement(
                'span',
                { className: 'gray' },
                '\u5148\u751F'
              )
            ),
            _react2.default.createElement(
              'label',
              { className: 'tmr', onClick: function onClick() {
                  return _this6.handleGenderChange(1);
                } },
              _react2.default.createElement('img', { src: gender ? _choose2.default : _nochoose2.default, style: iconStyle }),
              _react2.default.createElement(
                'span',
                { className: 'gray' },
                '\u5973\u58EB'
              )
            )
          ),
          _react2.default.createElement(
            ListItem,
            null,
            _react2.default.createElement(
              'span',
              { className: 'wp20 inline-block' },
              '\u624B\u673A\u53F7'
            ),
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement('input', { type: 'tel', maxLength: '11', placeholder: '\u8BF7\u586B\u5199\u6536\u8D27\u4EBA\u7684\u7535\u8BDD\u53F7\u7801', value: phone, onChange: function onChange(e) {
                  return _this6.handlePhoneChange(e.target.value);
                }, className: 'wp80 no-border' })
            )
          ),
          _react2.default.createElement(
            _picker2.default,
            { extra: province + ' ' + city + ' ' + county,
              value: [provinceId, cityId, countyId], format: function format(val) {
                return val.join(' ');
              },
              data: districts, onChange: function onChange(val) {
                return _this6.handleChangeArea(val[0], val[1], val[2]);
              }, cols: '3' },
            _react2.default.createElement(
              ListItem,
              { className: 'am-list-point', arrow: 'horizontal' },
              '\u6240\u5728\u5730\u533A'
            )
          ),
          _react2.default.createElement(
            ListItem,
            null,
            _react2.default.createElement(
              'span',
              { className: 'wp20 inline-block' },
              '\u914D\u9001\u81F3'
            ),
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement('input', { type: 'text', onClick: function onClick(e) {
                  _this6.handleToggleAddressSearchShow(true);e.target.blur();
                }, placeholder: '\u8BF7\u586B\u5199\u5C0F\u533A/\u5199\u5B57\u697C/\u5B66\u6821\u7B49', value: address, className: 'wp80 no-border',
                onChange: function onChange(e) {
                  return _this6.handleAddressChange(e.target.value);
                } })
            )
          ),
          _react2.default.createElement(
            ListItem,
            null,
            _react2.default.createElement('span', { className: 'wp20 inline-block' }),
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement('input', { type: 'text', placeholder: '\u8865\u5145\u8BE6\u7EC6\u5730\u5740\uFF08\u5982\u95E8\u724C\u53F7/\u697C\u5C42\u7B49\uFF09', value: detail, className: 'wp80 no-border', onChange: function onChange(e) {
                  return _this6.handleAddrDetailChange(e.target.value);
                } })
            )
          ),
          _react2.default.createElement(
            _picker2.default,
            { extra: tag ? _react2.default.createElement(
                'span',
                { className: 'tag orange' },
                tag
              ) : '',
              data: ['无', '家', '公司', '学校'].map(function (d) {
                return { value: d, label: d };
              }), onChange: function onChange(val) {
                return _this6.handleTagChange(val[0]);
              }, cols: '1' },
            _react2.default.createElement(
              ListItem,
              { arrow: 'horizontal' },
              '\u6807\u7B7E'
            )
          )
        ),
        _react2.default.createElement(_whiteSpace2.default, { size: 'lg' }),
        _react2.default.createElement(
          _list2.default,
          null,
          _react2.default.createElement(
            ListItem,
            { extra: _react2.default.createElement(_switch2.default, { checked: !!isDefault, onChange: function onChange(checked) {
                  return _this6.handleDefaultChange(checked);
                } }) },
            '\u662F\u5426\u8BBE\u4E3A\u9ED8\u8BA4\u5730\u5740'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'pd16' },
          _react2.default.createElement(
            'button',
            { className: 'btn wp100 primary', onClick: function onClick() {
                return _this6.handleSaveContact();
              } },
            '\u4FDD\u5B58'
          )
        )
      );
    }
  }]);

  return CustomerForm;
}(_react.Component);

var iconStyle = {
  height: '.36rem', width: '.36rem', margin: '-.06rem .06rem 0 0'
};

exports.default = CustomerForm;