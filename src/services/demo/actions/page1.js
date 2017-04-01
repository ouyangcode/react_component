let timer

export const asyncTest =
  interval =>
    dispatch => {
      clearInterval(timer)
      timer = setInterval(() => dispatch(changeNum(Math.random())), interval)
    }

export const asyncStop = () => clearInterval(timer)

const changeNum = num => ({
  type: 'CHANGE_NUM',
  num
})
