import './style/index.scss'



import React, { Component } from 'react';
import { get, send } from '@boluome/common-lib'
import { moment, addInterval } from '@boluome/common-lib'
import { compose, ifElse, __, always, gte } from 'ramda'
// import { Calendar } from 'react-date-range';

let cYear, cMonth, cDay, TheDate;
var D = new Date();
var yy = D.getFullYear();
var mm = D.getMonth() + 1;
var dd = D.getDate();
var ww = D.getDay();
var ss = parseInt(D.getTime() / 1000);
if (yy < 100) yy = "19" + yy;
console.log(yy,mm,dd,ww,ss);

const zero = n => ifElse(gte(__, 10), always(n), always(`0${n}`))(n)

class MyCalendar extends Component {

	constructor(props){

		super(props)
		let { pricearr } = props;
		// if(pricearr && pricearr.length > 0){
		// 		this.state = {
		// 			...pricearr
		// 		}
		// }else{alert('err')
		// 	this.state = {
		// 		pricearr : []
		// 	}
		// }
		const year  = moment('YYYY')();
		const month = parseInt(moment('MM')());
		const getDate = compose(moment('date'), addInterval(-1, 'd'), moment('x'))
		let obj1 = {},obj2 = {}, obj3 = {},price = []
		// 三个月的天数
		const days1 = getDate(`${ year }${ month + 1 }`)
		const days2 = getDate(`${ year }${ month + 2 }`)
		const days3 = getDate(`${ year }${ month + 3 }`)
		// console.log('days1days1days1days1--',days1 ,days2 ,days3);
		// console.log('zero------------',zero(days2),days2);
		// 三个年月 -----解决safari  兼容性问题
		// const month1 = moment('YYYY-MM月')(`${ year }${zero( month )}`);console.log(month1);
		// const month2 = moment('YYYY年MM月')(`${ year }${ month + 1 }`);console.log(month2);
		// const month3 = moment('YYYY年MM月')(`${ year } ${ month + 2 }`);console.log(month3);
		// const mon2 = parseInt(moment('MM')(`${ year } ${ month + 1 }`));console.log(mon2);
		// const mon3 = parseInt(moment('MM')(`${ year } ${ month + 2 }`));console.log(mon3);
		const month1 = year + '年' + zero( month ) + '月';
		const month2 = year + '年' + zero( month + 1 ) + '月';
		const month3 = year + '年' + zero( month + 2 ) + '月';
		const mon2 = parseInt( month + 1 );console.log(mon2);
		const mon3 = parseInt( month + 2 );console.log(mon3);
		//三个月的第一天是周几
		const d1 = moment('day')(`${ year }${ month }`)
		const d2 = moment('day')(`${ year }${ month +1 }`)
		const d3 = moment('day')(`${ year }${ month + 2}`)
		// console.log('ddd----',d1,d2,d3);
		// this.CreateData();
		obj1.days = this.getMonthDays(days1);obj1.title = month1;obj1.firstweek = this.getMonthFirstDays(d1);obj1.adddata = this.GetnongDate(year,month,days1);obj1.month = month
		obj2.days = this.getMonthDays(days2);obj2.title = month2;obj2.firstweek = this.getMonthFirstDays(d2);obj2.adddata = this.GetnongDate(year,mon2,days2);obj2.month = mon2
		obj3.days = this.getMonthDays(days3);obj3.title = month3;obj3.firstweek = this.getMonthFirstDays(d3);obj3.adddata = this.GetnongDate(year,mon3,days3);obj3.month = mon3
		console.log(obj1);
		if(pricearr && pricearr.length > 0){
				this.state = {
					pricearr,
					dateList: [obj1,obj2,obj3]
				}
		}else{
			this.state = {
				pricearr : [],
				dateList: [obj1,obj2,obj3]
			}
		}
		this.GetnongDate = this.GetnongDate.bind(this)
		this.handleClickfn = this.handleClickfn.bind(this)
	}
	componentWillMount(){
		// alert('new')
		// this.CreateData();
	}
	// 造数据
	CreateData(){
		const listUrl = '/menpiao/v1/goods/'+'2973490'
		get(listUrl, { channel : 'lvmama' })
	    .then(({ code, data, message }) => {
	      if(code === 0) {
			  let pricearr = data.prices;
			  this.setState({
				  pricearr:pricearr
			  })
	      }
	    })
	}
	GetnongDate(year,mon,days){
		let cnarr = []
		for(let g = 1 ;g <= days ; g++){console.log('ssss');
			let obj = {},cn = this.GetLunarDay(year,mon,g).substring(this.GetLunarDay(year,mon,g).length-2,this.GetLunarDay(year,mon,g).length)
			obj.cn = cn;obj.day = g;obj.price = '';obj.fes = '';obj.mons = g < 10 ? (g = '0' +g) : (g);
			cnarr.push(obj);
		}
		console.log(cnarr);

		return cnarr
	}
	GetBit(m, n) {
	    return (m >> n) & 1;
	}
	e2c() {
		let CalendarData = new Array(100);
		let madd = new Array(12);
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
	    TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
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
	    for (m = 0; ; m++) {
	        k = (CalendarData[m] < 0xfff) ? 11 : 12;
	        for (n = k; n >= 0; n--) {
	            if (total <= 29 + this.GetBit(CalendarData[m], n)) {
	                isEnd = true; break;
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
	GetcDateString() {
		const tgString = "甲乙丙丁戊己庚辛壬癸";
		const dzString = "子丑寅卯辰巳午未申酉戌亥";
		const monString = "正二三四五六七八九十冬腊";
		const numString = "一二三四五六七八九十";
		const sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
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
	    tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
	    if (cDay % 10 != 0 || cDay == 10) {
	        tmp += numString.charAt((cDay - 1) % 10);
	    }
		//console.log(tmp);
	    return tmp;
	}


	GetLunarDay(solarYear, solarMonth, solarDay) {
	    //solarYear = solarYear<1900?(1900+solarYear):solarYear;
	    if (solarYear < 1921 || solarYear > 2020) {
	        return "";
	    } else {
	        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
	        this.e2c(solarYear, solarMonth, solarDay);
	        return this.GetcDateString();
	    }
	}


	GetCNDate() {
	    return this.GetLunarDay(yy, mm, dd);
	}
    // 获取年月显示标题
	getTitleDate(mon){
 	    for(let r = 0; r < mon.length ; r++){
 			m.push(mon[r])
 	    }
		return m;
	}
    //获取本月第一天的星期数
    getMonthFirstDays(d){console.log(d);
	   let m = [];
	   for(let k =0 ; k< d ; k++){
		   m.push(k)
	   }
	   return m
    }
	// 获取每月天数
 	getMonthDays(days){
		let d = []
		for(let g = 1; g <= days; g++){
			d.push(g)
		}
		return d
  	}
	// 获取价格数据
	handlePriceData(dateList,pricearr){
		if(pricearr){
			for(let o = 0;o < dateList.length;o++){
				const addItem = dateList[o].adddata;
				const titles = (dateList[o].title).split('年')[1].split('月')[0];
				for(let y = 0 ; y < pricearr.length ; y++){
					const pricearrSplit1 = (pricearr[y].date).split('-')[1];
					const pricearrSplit2 = (pricearr[y].date).split('-')[2];
					if(pricearrSplit1 == titles){console.log('pricearrSplit======',pricearrSplit1,'======',titles);
						for(let s = 0; s < addItem.length ; s++){
							let addItemSplit = (addItem[s].day <10 ? ('0'+addItem[s].day) : (addItem[s].day))
							if(addItemSplit == pricearrSplit2){
								addItem[s].price = pricearr[y].sellPrice //更改了marketPrice
								addItem[s].date = pricearr[y].date
								addItem[s].datestr = moment('x')(pricearr[y].date)
							}
						}
					}
				}
			}
		}
	}
	// 处理点击事件
	handleClickfn( price ,date ,datestr ){
    console.log(price,'-----=',date,'=-----',datestr);
		const { onChange } = this.props
		const res = { price ,date ,datestr }
		onChange(res)
		console.log('wobeifjisdjfi')
	}
	render(){
		const { dateList ,pricearr , handlePriceData } = this.state
		console.log('dateList,',dateList,'------',pricearr);
		this.handlePriceData(dateList,pricearr);

		const Weekday = ['日' , '一', '二', '三', '四', '五' , '六']
		return (
			<div className = "calendarWrap">
				<div className = "calendarHeader">
					{ Weekday.map((item ,index) => {
						return <span key = { index }>{ item }</span>
					})}
				</div>
				<div className = "calendarMain">
					<div className = "calendar">
						<Calendar dateList={ dateList } handleClickfn = { this.handleClickfn }/>
					</div>
				</div>
			</div>
		)
	}
}
export default MyCalendar


const Calendar = ({ dateList ,handleClickfn }) => {
	console.log('dateList', dateList);
	console.log('当前时间', yy , mm , dd);
	// let monthShow = 0
	// for(let i = 0; i < dateList.length; i++){ console.log('title',dateList[i].title);
	// 	const year = dateList[i].title.split('年')[0]
	// 	const mon = dateList[i].month
	// 	if(year == yy && mon <= mm){
	// 		monthShow = 1
	// 	}
	// }
  const fetday = [{ m:5, d:1, f:'劳动节' },{ m: 6, d:1, f:'儿童节' },{ m:7, d:1, f:'建军节' },{ m:8, d:1, f:'建党节' },{ m:10, d:1, f:'国庆节' }]
	let fetShow = 0;
	return(
		<div>
			{
				dateList.map((item ,index) => {
					return(

					<div className = "calendarList" key = { `key${index}` }>
						<div className = "calendarTitle" key = { index }>
							{ item.title }
						</div>
						<ul className = "dateUl">
							{
								(item.firstweek).map((items1 ,index) => (
									<li className = "itemList" key={ `key${index}` }>
									</li>
								))
							}
							{
								(item.adddata).map((items2, index) => (
									<li className = "itemList" key={ `key${index}` } onClick = {() => { items2.price ? ( handleClickfn( items2.price , items2.date ,items2.datestr ) ) :('')} }>
										<span className={ `${ item.month == mm && items2.day < dd ? 'itemspan' : '' }` }>
											{ items2.day }
										</span>
										<Addcalendar addData = { items2.price? '￥'+items2.price : items2.cn } calendarName = { items2.price ? 'priceCalendar' : (item.month == mm && items2.day < dd ? 'addCalendar itemspan' : 'addCalendar')} />
									</li>
								))
							}
							<div className = "clear"></div>
						</ul>
					</div>
				)})
			}
		</div>

	)
}


const Addcalendar = ({ addData, calendarName, onClickfn}) => {

	return(
		<div>
			<span className = { calendarName } >{ addData }</span>
		</div>
	)
}
