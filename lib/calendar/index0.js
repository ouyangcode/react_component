'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = require('@boluome/common-lib/lib/get');

var _get2 = _interopRequireDefault(_get);

var _addInterval = require('@boluome/common-lib/lib/add-interval');

var _addInterval2 = _interopRequireDefault(_addInterval);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _moment = require('@boluome/common-lib/lib/moment');

var _moment2 = _interopRequireDefault(_moment);

var _always = require('ramda/src/always');

var _always2 = _interopRequireDefault(_always);

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _gte = require('ramda/src/gte');

var _gte2 = _interopRequireDefault(_gte);

var _ifElse = require('ramda/src/ifElse');

var _ifElse2 = _interopRequireDefault(_ifElse);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./style/index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { Calendar } from 'react-date-range';

var cYear = void 0,
    cMonth = void 0,
    cDay = void 0,
    TheDate = void 0;
var D = new Date();
var yy = D.getFullYear();
var mm = D.getMonth() + 1;
var dd = D.getDate();
var ww = D.getDay();
var ss = parseInt(D.getTime() / 1000);
if (yy < 100) yy = "19" + yy;
console.log(yy, mm, dd, ww, ss);

var zero = function zero(n) {
	return (0, _ifElse2.default)((0, _gte2.default)(_2.default, 10), (0, _always2.default)(n), (0, _always2.default)('0' + n))(n);
};

var MyCalendar = function (_Component) {
	_inherits(MyCalendar, _Component);

	function MyCalendar(props) {
		_classCallCheck(this, MyCalendar);

		var _this = _possibleConstructorReturn(this, (MyCalendar.__proto__ || Object.getPrototypeOf(MyCalendar)).call(this, props));

		var pricearr = props.pricearr;
		// if(pricearr && pricearr.length > 0){
		// 		this.state = {
		// 			...pricearr
		// 		}
		// }else{alert('err')
		// 	this.state = {
		// 		pricearr : []
		// 	}
		// }

		var year = (0, _moment2.default)('YYYY')();
		var month = parseInt((0, _moment2.default)('MM')());
		var getDate = (0, _compose2.default)((0, _moment2.default)('date'), (0, _addInterval2.default)(-1, 'd'), (0, _moment2.default)('x'));
		var obj1 = {},
		    obj2 = {},
		    obj3 = {},
		    price = [];
		// 三个月的天数
		var days1 = getDate('' + year + (month + 1));
		var days2 = getDate('' + year + (month + 2));
		var days3 = getDate('' + year + (month + 3));
		// console.log('days1days1days1days1--',days1 ,days2 ,days3);
		// console.log('zero------------',zero(days2),days2);
		// 三个年月 -----解决safari  兼容性问题
		// const month1 = moment('YYYY-MM月')(`${ year }${zero( month )}`);console.log(month1);
		// const month2 = moment('YYYY年MM月')(`${ year }${ month + 1 }`);console.log(month2);
		// const month3 = moment('YYYY年MM月')(`${ year } ${ month + 2 }`);console.log(month3);
		// const mon2 = parseInt(moment('MM')(`${ year } ${ month + 1 }`));console.log(mon2);
		// const mon3 = parseInt(moment('MM')(`${ year } ${ month + 2 }`));console.log(mon3);
		var month1 = year + '年' + zero(month) + '月';
		var month2 = year + '年' + zero(month + 1) + '月';
		var month3 = year + '年' + zero(month + 2) + '月';
		var mon2 = parseInt(month + 1);console.log(mon2);
		var mon3 = parseInt(month + 2);console.log(mon3);
		//三个月的第一天是周几
		var d1 = (0, _moment2.default)('day')('' + year + month);
		var d2 = (0, _moment2.default)('day')('' + year + (month + 1));
		var d3 = (0, _moment2.default)('day')('' + year + (month + 2));
		// console.log('ddd----',d1,d2,d3);
		// this.CreateData();
		obj1.days = _this.getMonthDays(days1);obj1.title = month1;obj1.firstweek = _this.getMonthFirstDays(d1);obj1.adddata = _this.GetnongDate(year, month, days1);obj1.month = month;
		obj2.days = _this.getMonthDays(days2);obj2.title = month2;obj2.firstweek = _this.getMonthFirstDays(d2);obj2.adddata = _this.GetnongDate(year, mon2, days2);obj2.month = mon2;
		obj3.days = _this.getMonthDays(days3);obj3.title = month3;obj3.firstweek = _this.getMonthFirstDays(d3);obj3.adddata = _this.GetnongDate(year, mon3, days3);obj3.month = mon3;
		console.log(obj1);
		if (pricearr && pricearr.length > 0) {
			_this.state = {
				pricearr: pricearr,
				dateList: [obj1, obj2, obj3]
			};
		} else {
			_this.state = {
				pricearr: [],
				dateList: [obj1, obj2, obj3]
			};
		}
		_this.GetnongDate = _this.GetnongDate.bind(_this);
		_this.handleClickfn = _this.handleClickfn.bind(_this);
		return _this;
	}

	_createClass(MyCalendar, [{
		key: 'componentWillMount',
		value: function componentWillMount() {}
		// alert('new')
		// this.CreateData();

		// 造数据

	}, {
		key: 'CreateData',
		value: function CreateData() {
			var _this2 = this;

			var listUrl = '/menpiao/v1/goods/' + '2973490';
			(0, _get2.default)(listUrl, { channel: 'lvmama' }).then(function (_ref) {
				var code = _ref.code,
				    data = _ref.data,
				    message = _ref.message;

				if (code === 0) {
					var pricearr = data.prices;
					_this2.setState({
						pricearr: pricearr
					});
				}
			});
		}
	}, {
		key: 'GetnongDate',
		value: function GetnongDate(year, mon, days) {
			var cnarr = [];
			for (var g = 1; g <= days; g++) {
				console.log('ssss');
				var obj = {},
				    cn = this.GetLunarDay(year, mon, g).substring(this.GetLunarDay(year, mon, g).length - 2, this.GetLunarDay(year, mon, g).length);
				obj.cn = cn;obj.day = g;obj.price = '';obj.fes = '';obj.mons = g < 10 ? g = '0' + g : g;
				cnarr.push(obj);
			}
			console.log(cnarr);

			return cnarr;
		}
	}, {
		key: 'GetBit',
		value: function GetBit(m, n) {
			return m >> n & 1;
		}
	}, {
		key: 'e2c',
		value: function e2c() {
			var CalendarData = new Array(100);
			var madd = new Array(12);
			CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
			madd[0] = 0;
			madd[1] = 31;
			madd[2] = 59;
			madd[3] = 90;
			madd[4] = 120;
			madd[5] = 151;
			madd[6] = 181;
			madd[7] = 212;
			madd[8] = 243;
			madd[9] = 273;
			madd[10] = 304;
			madd[11] = 334;
			TheDate = arguments.length != 3 ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
			var total, m, n, k;
			var isEnd = false;
			var tmp = TheDate.getYear();
			if (tmp < 1900) {
				tmp += 1900;
			}
			total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

			if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
				total++;
			}
			for (m = 0;; m++) {
				k = CalendarData[m] < 0xfff ? 11 : 12;
				for (n = k; n >= 0; n--) {
					if (total <= 29 + this.GetBit(CalendarData[m], n)) {
						isEnd = true;break;
					}
					total = total - 29 - this.GetBit(CalendarData[m], n);
				}
				if (isEnd) break;
			}
			cYear = 1921 + m;
			cMonth = k - n + 1;
			cDay = total;
			if (k == 12) {
				if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
					cMonth = 1 - cMonth;
				}
				if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
					cMonth--;
				}
			}
		}
	}, {
		key: 'GetcDateString',
		value: function GetcDateString() {
			var tgString = "甲乙丙丁戊己庚辛壬癸";
			var dzString = "子丑寅卯辰巳午未申酉戌亥";
			var monString = "正二三四五六七八九十冬腊";
			var numString = "一二三四五六七八九十";
			var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
			var tmp = "";
			tmp += tgString.charAt((cYear - 4) % 10);
			tmp += dzString.charAt((cYear - 4) % 12);
			tmp += "(";
			tmp += sx.charAt((cYear - 4) % 12);
			tmp += ")年 ";
			if (cMonth < 1) {
				tmp += "(闰)";
				tmp += monString.charAt(-cMonth - 1);
			} else {
				tmp += monString.charAt(cMonth - 1);
			}
			tmp += "月";
			tmp += cDay < 11 ? "初" : cDay < 20 ? "十" : cDay < 30 ? "廿" : "三十";
			if (cDay % 10 != 0 || cDay == 10) {
				tmp += numString.charAt((cDay - 1) % 10);
			}
			//console.log(tmp);
			return tmp;
		}
	}, {
		key: 'GetLunarDay',
		value: function GetLunarDay(solarYear, solarMonth, solarDay) {
			//solarYear = solarYear<1900?(1900+solarYear):solarYear;
			if (solarYear < 1921 || solarYear > 2020) {
				return "";
			} else {
				solarMonth = parseInt(solarMonth) > 0 ? solarMonth - 1 : 11;
				this.e2c(solarYear, solarMonth, solarDay);
				return this.GetcDateString();
			}
		}
	}, {
		key: 'GetCNDate',
		value: function GetCNDate() {
			return this.GetLunarDay(yy, mm, dd);
		}
		// 获取年月显示标题

	}, {
		key: 'getTitleDate',
		value: function getTitleDate(mon) {
			for (var r = 0; r < mon.length; r++) {
				m.push(mon[r]);
			}
			return m;
		}
		//获取本月第一天的星期数

	}, {
		key: 'getMonthFirstDays',
		value: function getMonthFirstDays(d) {
			console.log(d);
			var m = [];
			for (var k = 0; k < d; k++) {
				m.push(k);
			}
			return m;
		}
		// 获取每月天数

	}, {
		key: 'getMonthDays',
		value: function getMonthDays(days) {
			var d = [];
			for (var g = 1; g <= days; g++) {
				d.push(g);
			}
			return d;
		}
		// 获取价格数据

	}, {
		key: 'handlePriceData',
		value: function handlePriceData(dateList, pricearr) {
			if (pricearr) {
				for (var o = 0; o < dateList.length; o++) {
					var addItem = dateList[o].adddata;
					var titles = dateList[o].title.split('年')[1].split('月')[0];
					for (var y = 0; y < pricearr.length; y++) {
						var pricearrSplit1 = pricearr[y].date.split('-')[1];
						var pricearrSplit2 = pricearr[y].date.split('-')[2];
						if (pricearrSplit1 == titles) {
							console.log('pricearrSplit======', pricearrSplit1, '======', titles);
							for (var s = 0; s < addItem.length; s++) {
								var addItemSplit = addItem[s].day < 10 ? '0' + addItem[s].day : addItem[s].day;
								if (addItemSplit == pricearrSplit2) {
									addItem[s].price = pricearr[y].sellPrice; //更改了marketPrice
									addItem[s].date = pricearr[y].date;
									addItem[s].datestr = (0, _moment2.default)('x')(pricearr[y].date);
								}
							}
						}
					}
				}
			}
		}
		// 处理点击事件

	}, {
		key: 'handleClickfn',
		value: function handleClickfn(price, date, datestr) {
			console.log(price, '-----=', date, '=-----', datestr);
			var onChange = this.props.onChange;

			var res = { price: price, date: date, datestr: datestr };
			onChange(res);
			console.log('wobeifjisdjfi');
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    dateList = _state.dateList,
			    pricearr = _state.pricearr,
			    handlePriceData = _state.handlePriceData;

			console.log('dateList,', dateList, '------', pricearr);
			this.handlePriceData(dateList, pricearr);

			var Weekday = ['日', '一', '二', '三', '四', '五', '六'];
			return _react2.default.createElement(
				'div',
				{ className: 'calendarWrap' },
				_react2.default.createElement(
					'div',
					{ className: 'calendarHeader' },
					Weekday.map(function (item, index) {
						return _react2.default.createElement(
							'span',
							{ key: index },
							item
						);
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'calendarMain' },
					_react2.default.createElement(
						'div',
						{ className: 'calendar' },
						_react2.default.createElement(Calendar, { dateList: dateList, handleClickfn: this.handleClickfn })
					)
				)
			);
		}
	}]);

	return MyCalendar;
}(_react.Component);

exports.default = MyCalendar;


var Calendar = function Calendar(_ref2) {
	var dateList = _ref2.dateList,
	    handleClickfn = _ref2.handleClickfn;

	console.log('dateList', dateList);
	console.log('当前时间', yy, mm, dd);
	// let monthShow = 0
	// for(let i = 0; i < dateList.length; i++){ console.log('title',dateList[i].title);
	// 	const year = dateList[i].title.split('年')[0]
	// 	const mon = dateList[i].month
	// 	if(year == yy && mon <= mm){
	// 		monthShow = 1
	// 	}
	// }
	var fetday = [{ m: 5, d: 1, f: '劳动节' }, { m: 6, d: 1, f: '儿童节' }, { m: 7, d: 1, f: '建军节' }, { m: 8, d: 1, f: '建党节' }, { m: 10, d: 1, f: '国庆节' }];
	var fetShow = 0;
	return _react2.default.createElement(
		'div',
		null,
		dateList.map(function (item, index) {
			return _react2.default.createElement(
				'div',
				{ className: 'calendarList', key: 'key' + index },
				_react2.default.createElement(
					'div',
					{ className: 'calendarTitle', key: index },
					item.title
				),
				_react2.default.createElement(
					'ul',
					{ className: 'dateUl' },
					item.firstweek.map(function (items1, index) {
						return _react2.default.createElement('li', { className: 'itemList', key: 'key' + index });
					}),
					item.adddata.map(function (items2, index) {
						return _react2.default.createElement(
							'li',
							{ className: 'itemList', key: 'key' + index, onClick: function onClick() {
									items2.price ? handleClickfn(items2.price, items2.date, items2.datestr) : '';
								} },
							_react2.default.createElement(
								'span',
								{ className: '' + (item.month == mm && items2.day < dd ? 'itemspan' : '') },
								items2.day
							),
							_react2.default.createElement(Addcalendar, { addData: items2.price ? '￥' + items2.price : items2.cn, calendarName: items2.price ? 'priceCalendar' : item.month == mm && items2.day < dd ? 'addCalendar itemspan' : 'addCalendar' })
						);
					}),
					_react2.default.createElement('div', { className: 'clear' })
				)
			);
		})
	);
};

var Addcalendar = function Addcalendar(_ref3) {
	var addData = _ref3.addData,
	    calendarName = _ref3.calendarName,
	    onClickfn = _ref3.onClickfn;


	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'span',
			{ className: calendarName },
			addData
		)
	);
};