const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const findeIndexForShowId= (arrays, showId) => {
  return arrays.findIndex((value, index, arr) => {
    return value.showId == parseInt(showId)
  })
}

module.exports = {
  formatTime: formatTime,
  findeIndexForShowId: findeIndexForShowId
}
