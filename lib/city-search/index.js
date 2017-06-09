
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setStore = require('@boluome/common-lib/lib/set-store');

var _setStore2 = _interopRequireDefault(_setStore);

var _get = require('@boluome/common-lib/lib/get');

var _get2 = _interopRequireDefault(_get);

var _getStore = require('@boluome/common-lib/lib/get-store');

var _getStore2 = _interopRequireDefault(_getStore);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _oto_saas_web_app_component = require('@boluome/oto_saas_web_app_component');

var _loading = require('../loading');

var _loading2 = _interopRequireDefault(_loading);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CitySearch = function (_React$Component) {
  _inherits(CitySearch, _React$Component);

  function CitySearch(props) {
    _classCallCheck(this, CitySearch);

    var _this = _possibleConstructorReturn(this, (CitySearch.__proto__ || Object.getPrototypeOf(CitySearch)).call(this, props));

    var citySelectedHistory = (0, _getStore2.default)('citySelectedHistory_' + _this.props.categoryCode) ? (0, _getStore2.default)('citySelectedHistory_' + _this.props.categoryCode).citySelectedHistory : [];
    console.log('props1111111', props);
    _this.state = {
      citySelectedHistory: citySelectedHistory,
      searchList: [],
      cityList: [],
      searchText: '',
      showCityList: true, //是否显示城市列表，当显示搜索列表时，隐藏城市列表,城市索引
      localCity: props.localCity.replace(/['省', '市', '区', '县']/, ''),
      localInList: ''
    };
    var getReqData = _this.getReqData.bind(_this);
    _this.chose.bind(_this);
    return _this;
  }

  _createClass(CitySearch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getReqData();
    }
  }, {
    key: 'getReqData',
    value: function getReqData() {
      var _this2 = this;

      var api = this.props.api;

      if (typeof api == 'string') {
        var handleClose = (0, _loading2.default)();
        (0, _get2.default)(api).then(function (_ref) {
          var code = _ref.code,
              data = _ref.data,
              message = _ref.message;

          if (code === 0) {
            _this2.getReq(data);
          }
          handleClose();
        }).catch(function (err) {
          return handleClose();
        });
      }
      if (Array.isArray(api)) {
        //当传入的api是数据是对象形式或是
        this.getReq(api);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          localInList = _state.localInList,
          localCity = _state.localCity,
          showCityList = _state.showCityList,
          formatCityList = _state.formatCityList,
          citySelectedHistory = _state.citySelectedHistory,
          cityList = _state.cityList;
      var _props$showCancel = this.props.showCancel,
          showCancel = _props$showCancel === undefined ? true : _props$showCancel;

      if (!localInList.name) {
        //当城市列表中没有当前城市，仅使用定位城市名作为返回的定位地址
        localInList = { name: localCity };
      }

      // 搜索请求通过组件方式传入
      var search = function search(searchKey, cb) {
        var handleLoadingClose = (0, _loading2.default)();
        if (searchKey) {
          var _cityList = [];
          for (var i = 0; i < _this3.state.cityList.length; i++) {
            //遍历请求回的城市信息
            if (_this3.state.cityList[i].name.indexOf(searchKey) > -1 || _this3.state.cityList[i].py.indexOf(searchKey) == 0) {
              //当搜索框内容符合城市名的汉字或拼音时，将当前城市保存到搜索到的城市列表中
              _cityList.push(_this3.state.cityList[i]);
            }
          }
          cb(null, _cityList);
          handleLoadingClose();
        } else {
          cb('searchKey is undefined');
        }
      };

      var ListItem = function ListItem(list, index, searchKey) {
        var result = list.data;
        return _react2.default.createElement(
          'p',
          { className: 'city-search-results-item' },
          result.name || result
        );
      };

      var Content = function Content() {
        var cityIndex = [];
        return _react2.default.createElement(
          'div',
          { className: 'citySearch' },
          _react2.default.createElement(
            'div',
            { className: 'cityLeft' },
            _react2.default.createElement(
              'div',
              { className: 'local-city', id: 'cityLocation' },
              _react2.default.createElement(
                'span',
                null,
                '\u5B9A\u4F4D'
              ),
              _react2.default.createElement(
                'p',
                { onClick: function onClick() {
                    return _this3.chose(localInList);
                  } },
                localInList.name
              ),
              ['1'].map(function (item) {
                cityIndex.push('Location');
              })
            ),
            citySelectedHistory.length > 0 ? _react2.default.createElement(
              'div',
              { key: 'city-key-citySelectedHistory', style: { display: showCityList ? 'block' : 'none' }, id: 'cityHistory', className: 'cityContainer' },
              _react2.default.createElement(
                'div',
                { className: 'cityKey' },
                _react2.default.createElement(
                  'span',
                  null,
                  '\u5386\u53F2'
                )
              ),
              _react2.default.createElement(
                'ul',
                null,
                ['1'].map(function (item) {
                  cityIndex.push('History');
                }),
                citySelectedHistory.map(function (city, idx) {
                  return _react2.default.createElement(
                    'li',
                    { style: (idx + 1) % 3 === 0 ? { marginRight: '0' } : {}, key: 'city-' + idx, onClick: function onClick() {
                        return _this3.chose(city);
                      } },
                    city.name
                  );
                })
              )
            ) : '',
            cityList.length > 0 ? _react2.default.createElement(
              'div',
              { className: 'cityList', style: { display: showCityList ? 'block' : 'none' } },
              formatCityList.map(function (_ref2, idx) {
                var key = _ref2.key,
                    data = _ref2.data;

                cityIndex.push(key);
                var letter = key;
                return _react2.default.createElement(
                  'div',
                  { key: 'city-key-' + idx, id: 'city' + letter, className: 'cityContainer' },
                  _react2.default.createElement(
                    'div',
                    { className: 'cityKey' },
                    _react2.default.createElement(
                      'span',
                      null,
                      letter
                    )
                  ),
                  _react2.default.createElement(
                    'ul',
                    null,
                    data.map(function (city, idx) {
                      return _react2.default.createElement(
                        'li',
                        { style: (idx + 1) % 3 === 0 ? { marginRight: '0' } : {}, key: 'city-' + idx, onClick: function onClick() {
                            return _this3.chose(city);
                          } },
                        city.name
                      );
                    })
                  )
                );
              })
            ) : ''
          ),
          _react2.default.createElement(
            'ul',
            { className: 'cityIndex', style: { display: showCityList ? 'block' : 'none' } },
            cityIndex.map(function (item, index) {
              return _react2.default.createElement(
                'li',
                { key: index },
                _react2.default.createElement(
                  'a',
                  { href: '#city' + item },
                  item === 'Location' ? '定位' : item === 'History' ? '历史' : item
                )
              );
            })
          )
        );
      };

      var Cancel = function Cancel() {
        var handleContainerClose = _this3.props.handleContainerClose;

        return _react2.default.createElement(
          'span',
          { className: 'cancel', onClick: function onClick() {
              return handleContainerClose();
            } },
          '\u53D6\u6D88'
        );
      };

      return _react2.default.createElement(_oto_saas_web_app_component.Search, {
        inputPlaceholder: '请输入搜索内容',
        content: _react2.default.createElement(Content, null),
        listItem: _react2.default.createElement(ListItem, null),
        noResult: _react2.default.createElement(
          'div',
          { className: 'no-result' },
          _react2.default.createElement(
            'p',
            null,
            '\u6CA1\u6709\u7ED3\u679C'
          )
        ),
        onFeach: search,
        handleResult: function handleResult(result) {
          return _this3.chose(result);
        },
        timing: 0,
        rightComponent: showCancel && _react2.default.createElement(Cancel, null)
      });
    }
  }, {
    key: 'chose',
    value: function chose(result) {
      var _props = this.props,
          handleCityData = _props.handleCityData,
          handleContainerClose = _props.handleContainerClose;

      document.getElementById('searchInput').value = '';
      this.search();
      this.setCityHistory(result);
      handleCityData(result);
      if (handleContainerClose) {
        handleContainerClose();
      }
    }
  }, {
    key: 'setCityHistory',
    value: function setCityHistory(cityObj) {
      //将当前选择的城市保存到session中
      var citySelectedHistory = this.state.citySelectedHistory;
      citySelectedHistory = citySelectedHistory.filter(function (item) {
        return item.name != cityObj.name;
      });
      citySelectedHistory.unshift(cityObj);
      (0, _setStore2.default)('citySelectedHistory_' + this.props.categoryCode, { citySelectedHistory: citySelectedHistory });
    }
  }, {
    key: 'getReq',
    value: function getReq(data) {
      // 将返回的城市列表中的每个城市信息对象中的键名都改成{name: , py: , id: }的形式
      var reply = [];
      var index = 0;
      var mapedData = data.reduce(function (nameMap, current) {
        //获取拼音
        var py = current.py;
        //取拼音中的第一个并转成大写字母

        var char = py.substr(0, 1).toUpperCase();
        //如果nameMap中有就往数组里添加一个
        if (nameMap[char]) {
          nameMap[char].push(current);
        }
        //如果nameMap中没有就新建一个数组
        else {
            nameMap[char] = [current];
          }
        return nameMap;
      }, {});
      //mapedData格式： { A: [{ name:'上海', py: 'shanghai' }], B: [...] }

      //转换mapedData
      for (var k in mapedData) {
        reply[index++] = {
          key: k,
          data: mapedData[k]
        };
      }

      // 对reply会的城市名，按a, b, c, d, 进行排序
      reply.sort(function (a, b) {
        return a.key.charCodeAt(0) - b.key.charCodeAt(0);
      });

      //reply格式： [{ key: 'A', data: [{ name:'上海', py: 'shanghai' }] }, ...]
      // 遍历请求回的城市列表，将定位城市改变对应的城市对象
      var cityName = this.state.localCity;
      var cityObj = {};
      data.forEach(function (item) {
        if (cityName == item.name) {
          cityObj = item;
          return;
        }
      });
      this.setState({
        cityList: data,
        formatCityList: reply,
        localInList: cityObj
      });
    }
  }, {
    key: 'search',
    value: function search() {
      //定义搜索事件
      var val = document.getElementById('searchInput').value,
          t = this;
      if (val === '') {
        return this.setState({ searchList: [], searchText: val, showCityList: true });
      }
      var cityList = [];
      for (var i = 0; i < this.state.cityList.length; i++) {
        //遍历请求回的城市信息
        if (this.state.cityList[i].name.indexOf(val) > -1 || this.state.cityList[i].py.indexOf(val) == 0) {
          //当搜索框内容符合城市名的汉字或拼音时，将当前城市保存到搜索到的城市列表中
          cityList.push(this.state.cityList[i]);
        }
      }
      this.setState({
        searchList: cityList,
        searchText: val,
        showCityList: false
      });
    }
  }]);

  return CitySearch;
}(_react2.default.Component);

exports.default = CitySearch;
;