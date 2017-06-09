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

var _slidePage = require('slide-page');

var _slidePage2 = _interopRequireDefault(_slidePage);

var _mask = require('../mask');

var _mask2 = _interopRequireDefault(_mask);

var _loading = require('../loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchList = function (_Component) {
  _inherits(SearchList, _Component);

  function SearchList(props) {
    _classCallCheck(this, SearchList);

    var _this = _possibleConstructorReturn(this, (SearchList.__proto__ || Object.getPrototypeOf(SearchList)).call(this, props));

    _this.state = {
      searchKey: '',
      searchHistory: (0, _getStore2.default)('searchHistory', 'session')
    };
    return _this;
  }

  _createClass(SearchList, [{
    key: 'componentWillMount',
    value: function componentWillMount(props) {}

    // 请求列表数据

  }, {
    key: 'feachList',
    value: function feachList(searchKey) {
      var _this2 = this;

      var onFeachList = this.props.onFeachList;

      var handleClose = (0, _loading2.default)();
      this.setState({ searchKey: searchKey });
      onFeachList(searchKey, function (err, dataList) {
        if (err) {
          //异常处理
          handleClose();
          console.log(err);
        }
        _this2.setState({ dataList: dataList });
        handleClose();
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(item) {
      var onChange = this.props.onChange;
      var resultInHistory = this.props.resultInHistory;

      onChange(item);
      resultInHistory(item);
      this.props.handleContainerClose();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          SearchListItem = _props.SearchListItem,
          DefaultContent = _props.DefaultContent,
          handleContainerClose = _props.handleContainerClose;
      var _state = this.state,
          searchKey = _state.searchKey,
          dataList = _state.dataList,
          searchHistory = _state.searchHistory;

      var box = void 0;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'searchBar' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', { id: 'searchInput', type: 'text', placeholder: this.props.inputPlaceholder,
              onChange: function onChange(e) {
                return _this3.feachList(e.target.value);
              } })
          ),
          _react2.default.createElement(
            'span',
            { className: 'cancel', onClick: function onClick() {
                return handleContainerClose();
              } },
            '\u53D6\u6D88'
          )
        ),
        searchKey.length > 0 ? _react2.default.createElement(SearchResultList, { dataList: dataList, SearchListItem: SearchListItem, searchKey: searchKey, onClick: this.handleClick.bind(this) }) : _react2.default.createElement(DefaultContent, { onClick: this.handleClick.bind(this) })
      );
    }
  }]);

  return SearchList;
}(_react.Component);

exports.default = SearchList;


var SearchResultList = function SearchResultList(_ref) {
  var dataList = _ref.dataList,
      searchKey = _ref.searchKey,
      SearchListItem = _ref.SearchListItem,
      _onClick = _ref.onClick;

  if (dataList && dataList.length > 0) {
    return _react2.default.createElement(
      'div',
      { className: 'dataList' },
      _react2.default.createElement(
        'ul',
        null,
        dataList.map(function (item) {
          return _react2.default.createElement(
            'li',
            { key: 'SearchResultList-' + Math.random(), onClick: function onClick() {
                _onClick(item);
              } },
            _react2.default.createElement(SearchListItem, _extends({}, item, { searchKey: searchKey }))
          );
        })
      )
    );
  } else if (dataList) {
    return _react2.default.createElement(
      'div',
      { className: 'notFound' },
      '\u672A\u627E\u5230\u8BE5\u5C0F\u533A'
    );
  } else {
    return _react2.default.createElement('div', null);
  }
};