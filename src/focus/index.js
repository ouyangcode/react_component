
import React, {Component, PropTypes} from 'react';
import { stringifyQuery, parseQuery, parseLocName, get, send, setStore, getStore, removeStore } from '@boluome/common-lib'



const ua = navigator.userAgent;
const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
let dpr = window.devicePixelRatio || 1;
if (isIos || (!(matches && matches[1] > 534) && !isUCHd)) {
  // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
  dpr = 1;
}


let startX,movedX
export default class Focus extends Component {
  static defaultProps = {
    imgTruewidth    : 1.8,
    imgMarginwidth  : 0.18,
    initNum         : 0,
    scaleX          : parseFloat(window.document.documentElement.style.fontSize, 10) / dpr,
    dataList        : [],
  };

  // props
  static propTypes = {
    imgTruewidth    : PropTypes.number,//图片实际宽度
    imgMarginwidth  : PropTypes.number,//图片左\右边距
    onChange        : PropTypes.func,//图片改变时
    dataList        : PropTypes.array,//图片改变时
  };


  constructor(props) {
    super(props);
    this.state = {
      animate :"",
      currentIndex: props.initNum
    };
    this.pullX = 0
    this.focusContainer = null
  }



  componentWillMount() {
    const { imgTruewidth, imgMarginwidth, initNum, onChange, dataList } = this.props;
    let imgWidth = imgTruewidth + imgMarginwidth*2;
    onChange && onChange(dataList[initNum])
    this.setState({
      animate : "transform 0.2s ease-in 0s"
    });
    this.pullX = initNum*imgWidth*(-1)
  }


  handleTouchStart(e){
    startX = e.touches ? e.touches[0].screenX : e.screenX;
    movedX = e.touches ? e.touches[0].screenX : e.screenX;
    this.setState({
      animate : "",
    });
  }


  handleTouchMove(e) {
    e.preventDefault()
    const { pullX } = this;
    const { imgTruewidth, imgMarginwidth, scaleX, dataList } = this.props;
    let imgWidth = imgTruewidth + imgMarginwidth*2;
    let moveX    =  e.touches ? e.touches[0].screenX : e.screenX;
    let distance = (moveX - movedX)/scaleX + pullX;
    if( distance > (dataList.length - 1)*imgWidth*(-1) && distance < 0 ){
      this.pullX = distance
      this.focusContainer.style.WebkitTransform = `translateX(${this.pullX}rem)`
    }
    movedX = moveX;
  }
  handleTouchEnd(e){
    const { pullX } = this;
    const { imgTruewidth, imgMarginwidth, onChange, scaleX, dataList } = this.props;
    let imgWidth = imgTruewidth + imgMarginwidth*2;
    let endpullX = (Math.abs(pullX)%imgWidth > (imgWidth/2))?Math.ceil(Math.abs(pullX)/imgWidth) : endpullX = Math.floor(Math.abs(pullX)/imgWidth)

    let boolDist = (movedX - startX)/scaleX;
    if( (startX !== movedX)?((Math.abs(boolDist) > (imgWidth/2))?true:false):false ){onChange && onChange(dataList[endpullX])}
    this.setState({
      currentIndex: endpullX,
      animate : "transform 0.2s ease-in 0s",
    });
    this.pullX = endpullX*imgWidth*(-1),
    this.focusContainer.style.WebkitTransform = `translateX(${this.pullX}rem)`

  }


  handleClick(o, i) {
    const { pullX } = this;
    const { imgTruewidth, imgMarginwidth, onChange } = this.props;
    let imgWidth = imgTruewidth + imgMarginwidth*2;
    if(pullX !== i*imgWidth*(-1)){onChange && onChange(o)}
    this.setState({
      currentIndex: i,
      animate : "transform 0.2s ease-in 0s",
    });
    this.pullX = i*imgWidth*(-1),
    this.focusContainer.style.WebkitTransform = `translateX(${this.pullX}rem)`
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataList !== this.props.dataList) {
      let initNum = nextProps.initNum?nextProps.initNum:0
      nextProps.onChange && nextProps.onChange(nextProps.dataList[initNum]);
      this.setState({
        currentIndex: initNum,
      });
      const { imgTruewidth, imgMarginwidth } = this.props;
      let imgWidth = imgTruewidth + imgMarginwidth*2;
      this.pullX = initNum*imgWidth*(-1)
      this.focusContainer.style.WebkitTransform = `translateX(${this.pullX}rem)`
    }
  }


  render() {
    const { animate, currentIndex = 0, pullX } = this.state;
    const { dataList, imgTruewidth, imgMarginwidth, style } = this.props;

    let imgWidth = imgTruewidth + imgMarginwidth * 2;
    let picList = dataList.map( (o,i) => (
      <span style={{
                    width:`${imgTruewidth}rem`,
                    height: `2.47rem`,
                    display: 'inline-block',
                    margin : `0 ${imgMarginwidth}rem`,
                    border: '1px solid #fff',
                    boxSizing: 'border-box',
                    WebkitTransformOrigin: 'center bottom',
                    WebkitTransform: `scale(${ currentIndex === i ? 1.1 : 1 })`
                 }}
           key={i}
           onClick={ () => this.handleClick(o, i) }>
           <img style={{
                         width:`100%`,
                         height:`100%`,
                      }}
                src={o.pic} />
      </span>
    ) )
    return (
      <div
        style={{
          width      : '100%',
          overflowX  : 'hidden',
          paddingTop : '0.3rem',
          ...style
         }}>
        <p
          className='imgWrap'
          style={{
            width            : `calc(100%  + ${(dataList.length-1)*imgWidth}rem )`,
            height           : `2.5rem`,
            WebkitTransition : `${animate}`,
            whiteSpace       : 'nowrap',
            paddingLeft      : `calc(50% - ${imgWidth/2}rem )`,
            paddingRight     : `calc(50% - ${imgWidth/2}rem )`,
            boxSizing        : 'border-box',
            overflow         : 'visible',
            perspective      : '1px',
          }}
          onTouchStart={ e => this.handleTouchStart(e) }
          onTouchMove={ e => this.handleTouchMove(e) }
          onTouchEnd = { e => this.handleTouchEnd(e) }
          ref={ node => {
            if(node) {
              this.focusContainer = node
              this.focusContainer.style.WebkitTransform = `translateX(${this.pullX}rem)`
            }
          } }
          >
          {picList}
        </p>
      </div>
    )
  }
}
