'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _getStore = require('@boluome/common-lib/lib/get-store');

var _getStore2 = _interopRequireDefault(_getStore);

var _css = require('antd-mobile/lib/list/style/css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./style/index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loading = require('../loading');

var _loading2 = _interopRequireDefault(_loading);

var _zhuanche_start = require('./img/zhuanche_start.png');

var _zhuanche_start2 = _interopRequireDefault(_zhuanche_start);

var _my_location = require('./img/my_location.png');

var _my_location2 = _interopRequireDefault(_my_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = _list2.default.Item;

var AddressSearch = function (_Component) {
  _inherits(AddressSearch, _Component);

  function AddressSearch(props) {
    _classCallCheck(this, AddressSearch);

    var _this = _possibleConstructorReturn(this, (AddressSearch.__proto__ || Object.getPrototypeOf(AddressSearch)).call(this, props));

    var geoPoint = (0, _getStore2.default)('geopoint', 'session');
    var _this$props = _this.props,
        longitude = _this$props.longitude,
        latitude = _this$props.latitude;

    if (longitude && latitude) {
      geoPoint = (0, _merge2.default)(geoPoint, { longitude: longitude, latitude: latitude });
    }
    _this.state = {
      geoPoint: geoPoint
    };
    _this.mapContainer;
    _this.map;
    console.log('this.state', _this.state);
    return _this;
  }

  _createClass(AddressSearch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var geoPoint = this.state.geoPoint;

      this.getGoLocation(geoPoint);
    }
    // 通过经纬度定位，联动

  }, {
    key: 'getGoLocation',
    value: function getGoLocation(geoPoint) {
      var _this2 = this;

      var _window$BMap = window.BMap,
          Map = _window$BMap.Map,
          Point = _window$BMap.Point,
          Marker = _window$BMap.Marker,
          Icon = _window$BMap.Icon,
          Size = _window$BMap.Size,
          Geocoder = _window$BMap.Geocoder,
          LocalSearch = _window$BMap.LocalSearch;

      var point = new Point(geoPoint.longitude, geoPoint.latitude);
      this.geoCoder = new Geocoder();
      this.localSearch = new LocalSearch(point, { onSearchComplete: this.searchComplete.bind(this) });
      var map = new Map(this.mapContainer);
      var marker = new Marker(point, { icon: new Icon(_zhuanche_start2.default, new Size(46, 77)) });
      map.centerAndZoom(point, 26);
      map.addOverlay(marker);
      map.panTo(point);
      map.addEventListener('onmoving', function () {
        marker.setPosition(map.getCenter());
        _this2.getLocation(marker);console.log('marker', marker);
      });
      this.getLocation(marker);
      console.log('geoPoint-----', this.state);
    }
  }, {
    key: 'getLocation',
    value: function getLocation(marker) {
      var _this3 = this;

      var closeLoading = (0, _loading2.default)({ maskClosable: false, mask: false });
      this.geoCoder.getLocation(marker.getPosition(), function (reply) {
        console.log('woshisha=', reply);
        _this3.setState({ location: reply.surroundingPois });console.log('reply.surroundingPois', reply.surroundingPois);
        closeLoading();
      });
    }
  }, {
    key: 'handleSearchAddr',
    value: function handleSearchAddr(keyWord) {
      console.log('开始搜索');
      this.localSearch.search(keyWord);
      this.setState({ keyWord: keyWord });
      console.log('woshi ---state', this.state);
    }
  }, {
    key: 'searchComplete',
    value: function searchComplete(reply) {
      if (reply) {
        var searchResult = [];
        for (var i = 0; i < reply.getCurrentNumPois(); i++) {
          searchResult.push(reply.getPoi(i));
        }
        this.setState({ searchResult: searchResult });
      }
    }
  }, {
    key: 'handleChooseAddress',
    value: function handleChooseAddress(local) {
      var _props = this.props,
          onSuccess = _props.onSuccess,
          handleContainerClose = _props.handleContainerClose;

      console.log('loc', local);

      onSuccess(local);
      handleContainerClose();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          _state$searchResult = _state.searchResult,
          searchResult = _state$searchResult === undefined ? [] : _state$searchResult,
          loading = _state.loading,
          _state$location = _state.location,
          location = _state$location === undefined ? [] : _state$location,
          _state$keyWord = _state.keyWord,
          keyWord = _state$keyWord === undefined ? '' : _state$keyWord;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'search-address-container' },
          _react2.default.createElement(
            'div',
            { className: 'search' },
            _react2.default.createElement('input', { type: 'text', placeholder: '\u8BF7\u8F93\u5165\u5730\u5740', onChange: function onChange(_ref) {
                var target = _ref.target;
                return _this4.handleSearchAddr(target.value);
              } })
          ),
          keyWord.length > 0 ? _react2.default.createElement(
            'div',
            { className: 'location-container pos-abs wp100', style: { height: 'calc(100% - .95rem)', 'zIndex': '99', backgroundColor: '#fff' } },
            searchResult.length === 0 ? _react2.default.createElement(
              'p',
              { style: { textAlign: 'center', color: '#bfbfbf', boxSizing: 'border-box', padding: '.20rem 0' } },
              '\u6CA1\u6709\u7ED3\u679C'
            ) : searchResult.map(function (loc, idx) {
              return _react2.default.createElement(
                'div',
                { className: 'location', onClick: function onClick() {
                    return _this4.handleChooseAddress(loc);
                  }, key: 'location-search-result-' + idx },
                _react2.default.createElement(
                  'div',
                  { className: 'title' },
                  loc.title
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'address' },
                  loc.address
                )
              );
            })
          ) : ''
        ),
        _react2.default.createElement('div', { className: 'pak', ref: function ref(node) {
            return _this4.mapContainer = node;
          }, style: { width: '100%', height: '40%', borderBottom: '1px solid #eee' } }),
        keyWord.length > 0 ? '' : _react2.default.createElement('img', { className: 'gobackLocation', src: _my_location2.default, onClick: function onClick() {
            var geoPoints = (0, _getStore2.default)('geopoint', 'session');
            // geoPoints.longitude = getStore('goBackPoint','session').lng
            // geoPoints.latitude = getStore('goBackPoint','session').lat
            _this4.getGoLocation(geoPoints);
          } }),
        _react2.default.createElement(
          'div',
          { className: 'location-container touch-layer', style: { height: 'calc(60% - .95rem)' } },
          location.map(function (loc, idx) {
            return _react2.default.createElement(
              'div',
              { className: 'location', onClick: function onClick() {
                  return _this4.handleChooseAddress(loc);
                }, key: 'location-result-' + idx },
              _react2.default.createElement(
                'div',
                { className: 'title' },
                loc.title
              ),
              _react2.default.createElement(
                'div',
                { className: 'address' },
                loc.address
              )
            );
          })
        )
      );
    }
  }]);

  return AddressSearch;
}(_react.Component);

exports.default = AddressSearch;