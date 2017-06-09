'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('./style/contact-show.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ic_location = require('./img/ic_location.png');

var _ic_location2 = _interopRequireDefault(_ic_location);

var _ic_gojiao = require('./img/ic_gojiao.png');

var _ic_gojiao2 = _interopRequireDefault(_ic_gojiao);

var _ic_bgs = require('./img/ic_bgs.png');

var _ic_bgs2 = _interopRequireDefault(_ic_bgs);

var _ic_add = require('./img/ic_add.png');

var _ic_add2 = _interopRequireDefault(_ic_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactShow = function ContactShow(_ref) {
    var contact = _ref.contact,
        handleSuccess = _ref.handleSuccess;
    var name = contact.name,
        city = contact.city,
        cityId = contact.cityId,
        contactId = contact.contactId,
        county = contact.county,
        countyId = contact.countyId,
        detail = contact.detail,
        gender = contact.gender,
        latitude = contact.latitude,
        longitude = contact.longitude,
        phone = contact.phone,
        province = contact.province,
        provinceId = contact.provinceId,
        tag = contact.tag,
        userId = contact.userId;

    console.log(!!contact);
    return _react2.default.createElement(
        'div',
        { className: 'addrWrap', onClick: function onClick() {
                return handleSuccess();
            } },
        _react2.default.createElement(
            'div',
            null,
            contact ? _react2.default.createElement(
                'div',
                { className: 'addr_one' },
                _react2.default.createElement(
                    'div',
                    { className: 'addr_main' },
                    _react2.default.createElement(
                        'div',
                        { className: 'addr_l' },
                        _react2.default.createElement('img', { src: _ic_location2.default })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'addr_c' },
                        _react2.default.createElement(
                            'div',
                            { className: 'addr_name kong' },
                            _react2.default.createElement(
                                'span',
                                null,
                                name
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                gender == '1' ? '女' : '男'
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                phone
                            ),
                            tag ? _react2.default.createElement(
                                'span',
                                { className: 'tag' },
                                tag
                            ) : ''
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'addr_city kong' },
                            _react2.default.createElement(
                                'span',
                                null,
                                city
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                county
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'addr_detail' },
                            _react2.default.createElement(
                                'span',
                                null,
                                detail
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'addr_r' },
                        _react2.default.createElement('img', { src: _ic_gojiao2.default })
                    ),
                    _react2.default.createElement('div', { className: 'clear' })
                )
            ) : _react2.default.createElement(
                'div',
                { className: 'addr_no' },
                _react2.default.createElement('img', { src: _ic_add2.default }),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u6DFB\u52A0\u6536\u8D27\u5730\u5740'
                ),
                _react2.default.createElement('img', { src: _ic_gojiao2.default, className: 'goChoose' })
            )
        ),
        _react2.default.createElement('div', { className: 'addr_line', style: { backgroundImage: 'url(' + _ic_bgs2.default + ')' } })
    );
};

exports.default = ContactShow;