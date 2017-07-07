'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    { className: 'loading-bro' },
    _react2.default.createElement(
      'svg',
      { id: 'load', x: '0px', y: '0px', viewBox: '0 0 150 150' },
      _react2.default.createElement('circle', { id: 'loading-inner', cx: '75', cy: '75', r: '60' })
    ),
    _react2.default.createElement(
      'span',
      { style: {
          color: 'rgb(255, 255, 255)',
          fontSize: '28px',
          display: 'block',
          verticalAlign: 'top',
          paddingTop: '19px',
          marginLeft: '30px'
        }
      },
      '\u6D4B\u8BD5\u4E00\u4E0B\u6D4B\u8BD5\u6D4B\u8BD5\u4E00\u4E0B\u6D4B\u8BD5'
    )
  );
};