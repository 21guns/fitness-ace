import initCalendar from '../../component/calendar/main.js';

Page({
  onLoad() {
    initCalendar({
      afterTapDay(currentSelect, event) {
        console.log(currentSelect, event)
      }});
  },
  onShow() {
    this.calendar.setTodoLabels({
        // 待办点标记设置
        pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
        dotColor: '#40', // 待办点标记颜色
        // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
        // circle: true, // 待办
        days: [{
          year: 2019,
          month: 4,
          day: 3,
          showTodoLabel: true,
          todoText: '待办'
        }, {
            year: 2019,
            month: 4,
            day: 15,
            showTodoLabel: true,
            todoText: '待办'
          }],
      });
  },

})