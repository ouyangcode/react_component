
import React, {Component, PropTypes} from 'react';
import { stringifyQuery, parseQuery, parseLocName, get, send, setStore, getStore, removeStore } from '@boluome/common-lib'



let startX,movedX
export default class Focus extends Component {
  static defaultProps = {
    imgTruewidth    : 1.8,
    imgMarginwidth  : 0.18,
    initNum         : 0,
    scaleX          : parseFloat(window.document.documentElement.style.fontSize, 10),
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
      pullX   : 0,
      animate :"",
    };
  }



  componentWillMount() {
    const { pullX } = this.state;
    const { imgTruewidth, imgMarginwidth, initNum, onChange, dataList } = this.props;
    let imgWidth = imgTruewidth + imgMarginwidth*2;
    onChange && onChange(dataList[initNum])
    this.setState({
      pullX   : initNum*imgWidth*(-1),
      animate : "all 0.2s ease-in 0s"
    });
  }


  handleTouchStart(e){
    startX = e.touches ? e.touches[0].screenX : e.screenX;
    movedX = e.touches ? e.touches[0].screenX : e.screenX;
    this.setState({
      animate : "",
    });
  }


  handleTouchMove(e){
    const { pullX } = this.state;
    const { imgTruewidth, imgMarginwidth, scaleX, dataList } = this.props;
    let imgWidth = imgTruewidth + imgMarginwidth*2;
    let moveX    =  e.touches ? e.touches[0].screenX : e.screenX;
    let distance = (moveX - movedX)/scaleX + pullX;
    if( distance > (dataList.length - 1)*imgWidth*(-1) && distance < 0 ){
      this.setState({
        pullX: distance
      });
    }
    movedX = moveX;
  }
  handleTouchEnd(e){
    const { pullX } = this.state;
    const { imgTruewidth, imgMarginwidth, onChange, scaleX, dataList } = this.props;
    let imgWidth = imgTruewidth + imgMarginwidth*2;
    let endpullX = (Math.abs(pullX)%imgWidth > (imgWidth/2))?Math.ceil(Math.abs(pullX)/imgWidth) : endpullX = Math.floor(Math.abs(pullX)/imgWidth)


    let boolDist = (movedX - startX)/scaleX;
    if( (startX !== movedX)?((Math.abs(boolDist) > (imgWidth/2))?true:false):false ){onChange && onChange(dataList[endpullX])}
    this.setState({
      pullX   : endpullX*imgWidth*(-1),
      animate : "all 0.2s ease-in 0s",
    });


  }


  handleClick(o, i) {
    const { pullX } = this.state;
    const { imgTruewidth, imgMarginwidth, onChange } = this.props;
    let imgWidth = imgTruewidth + imgMarginwidth*2;
    if(pullX !== i*imgWidth*(-1)){onChange && onChange(o)}
    this.setState({
      pullX   : i*imgWidth*(-1),
      animate : "all 0.2s ease-in 0s",
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataList !== this.props.dataList) {
      let initNum = nextProps.initNum?nextProps.initNum:0
      nextProps.onChange && nextProps.onChange(nextProps.dataList[initNum]);
    }
  }


  render() {
    const {  pullX, animate } = this.state;
    const { dataList, imgTruewidth, imgMarginwidth } = this.props;

    let imgWidth = imgTruewidth + imgMarginwidth*2;
    let picList = dataList.map( (o,i) => <img style={{ width:`${imgTruewidth}rem`,margin : `0 ${imgMarginwidth}rem` }} src={o.pic} key={i} onClick={ () => this.handleClick(o, i) }/> )
    return (
      <div
        style={{
          width     : '100%',
          overflow  : 'hidden',
         }}>
        <p
          className='imgWrap'
          style={{
            width            : `calc(100%  + ${(dataList.length-1)*imgWidth}rem )`,
            WebkitTransform  : `translateX(${pullX}rem)`,
            WebkitTransition : `${animate}`,
            whiteSpace       : 'nowrap',
            paddingLeft      : `calc(50% - ${imgWidth/2}rem )`,
            paddingRight     : `calc(50% - ${imgWidth/2}rem )`,
            overflow         : 'visible',
            perspective      : '1px',
           }}
          onTouchStart={ e => this.handleTouchStart(e) }
          onTouchMove={ e => this.handleTouchMove(e) }
          onTouchEnd = { e => this.handleTouchEnd(e) }
          >
          {picList}
        </p>
      </div>
    )
  }
}
