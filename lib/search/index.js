'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getStore = require('@boluome/common-lib/lib/get-store');

var _getStore2 = _interopRequireDefault(_getStore);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./style/index.scss');

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

var timer = void 0;

var Search = function (_Component) {
  _inherits(Search, _Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this.state = {
      searchKey: '',
      searchHistory: (0, _getStore2.default)('searchHistory', 'session')
    };
    return _this;
  }

  _createClass(Search, [{
    key: 'componentWillMount',
    value: function componentWillMount(props) {
      var _props = this.props,
          listItem = _props.listItem,
          content = _props.content,
          noResult = _props.noResult,
          rightComponent = _props.rightComponent,
          leftComponent = _props.leftComponent;

      if (rightComponent && leftComponent) {
        this.setState({ inputWidth: '70%' });
      } else if (rightComponent || leftComponent) {
        this.setState({ inputWidth: '85%' });
      } else {
        this.setState({ inputWidth: '100%' });
      }
    }

    // 请求列表数据

  }, {
    key: 'feachList',
    value: function feachList(searchKey) {
      var _this2 = this;

      var _props2 = this.props,
          onFeach = _props2.onFeach,
          _props2$delayTime = _props2.delayTime,
          delayTime = _props2$delayTime === undefined ? 500 : _props2$delayTime;
      // console.log('timing', timing);

      this.setState({ searchKey: searchKey });
      if (searchKey) {
        this.setState({ loaded: 0 });
        clearTimeout(timer);
        timer = setTimeout(function () {
          return onFeach(searchKey, function (err, dataList) {
            if (err) {
              //异常处理
              console.log(err);
            }
            _this2.setState({ dataList: dataList, loaded: 1 });
          });
        }, delayTime);
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(item) {
      var _props3 = this.props,
          handleResult = _props3.handleResult,
          _props3$timing = _props3.timing,
          timing = _props3$timing === undefined ? 500 : _props3$timing;
      // const { resultInHistory } = this.props

      handleResult(item);
      // resultInHistory(item)
      timing !== 0 && this.props.handleContainerClose();
    }
  }, {
    key: 'handleKeywordChange',
    value: function handleKeywordChange(keyword) {
      // 把keyword 放进输入框
      // 搜索
      this.setState({ searchKey: keyword }, this.feachList(keyword));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props4 = this.props,
          listItem = _props4.listItem,
          content = _props4.content,
          noResult = _props4.noResult,
          rightComponent = _props4.rightComponent,
          leftComponent = _props4.leftComponent,
          handleClick = _props4.handleClick;
      var _state = this.state,
          searchKey = _state.searchKey,
          dataList = _state.dataList,
          searchHistory = _state.searchHistory,
          inputWidth = _state.inputWidth,
          loaded = _state.loaded;

      var cloneProps = this.props;
      var box = void 0;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'searchBar' },
          leftComponent ? _react2.default.createElement(
            'div',
            { className: 'leftCom' },
            _react2.default.cloneElement(leftComponent, _extends({}, cloneProps))
          ) : '',
          _react2.default.createElement(
            'div',
            { className: 'searchMain', style: { width: inputWidth } },
            _react2.default.createElement('input', { id: 'searchInput', type: 'text', placeholder: this.props.inputPlaceholder,
              onChange: function onChange(e) {
                return _this3.feachList(e.target.value);
              }, onClick: handleClick ? function () {
                return handleClick();
              } : function () {
                return console.log('no click');
              }
            })
          ),
          rightComponent ? _react2.default.createElement(
            'div',
            { className: 'rightCom' },
            _react2.default.cloneElement(rightComponent, _extends({}, cloneProps))
          ) : ''
        ),
        searchKey.length > 0 ? _react2.default.createElement(SearchResultList, { dataList: dataList, listItem: listItem, searchKey: searchKey, noResult: noResult, content: content, loaded: loaded, onClick: this.handleClick.bind(this) }) : _react2.default.createElement('div', null),
        content ? _react2.default.cloneElement(content, { onKeywordChange: function onKeywordChange(keyword) {
            return _this3.handleKeywordChange(keyword);
          } }) : ''
      );
    }
  }]);

  return Search;
}(_react.Component);

exports.default = Search;


var SearchResultList = function SearchResultList(_ref) {
  var _ref$dataList = _ref.dataList,
      dataList = _ref$dataList === undefined ? [] : _ref$dataList,
      searchKey = _ref.searchKey,
      listItem = _ref.listItem,
      noResult = _ref.noResult,
      _onClick = _ref.onClick,
      content = _ref.content,
      loaded = _ref.loaded;

  console.log('loaded------------', loaded, dataList);
  if (dataList && dataList.length > 0) {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'dataList' },
        _react2.default.createElement(
          'ul',
          null,
          dataList.map(function (data, index) {
            return _react2.default.createElement(
              'li',
              { key: 'SearchResultList-' + Math.random(), onClick: function onClick() {
                  _onClick(data);
                } },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.cloneElement(listItem, { data: data, index: index, searchKey: searchKey })
              )
            );
          })
        )
      )
    );
  } else if (dataList.length === 0 && loaded) {
    return _react2.default.createElement(
      'div',
      null,
      noResult
    );
  } else {
    return _react2.default.createElement('div', null);
  }
};