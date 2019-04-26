//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    topics:["胸","背","腿","肩"],
    topic: 0,
    showId:1,
    plan:{
      date:'',
      topic:0,
      groups: [{
        showId: 0,
        count: 0,
        interval: 60,
        actions: [{
          showId: 0,
          name: '',
          weight: 0,
          frequency: 0,
        }]
      }]
    },
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var nowDate = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day); 
    this.data.plan.date = nowDate
    this._refresh()

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  bindDateChange: function (e) {
    this.data.plan.date = e.detail.value
    this._refresh()
  },
  bindTopicChange: function (e) {
    this.data.plan.topic = e.detail.value
    this._refresh()
  },
  bindNameInput: function (e) {
    let groupIndex = this._findGoupIndex(e)
    let actionIndex = this._findActionIndex(e)
    this.data.plan.groups[groupIndex].actions[actionIndex].name = e.detail.value
    this.setData({ plan: this.data.plan })
  },
  bindWeightInput: function (e) {
    let groupIndex = this._findGoupIndex(e)
    let actionIndex = this._findActionIndex(e)
    this.data.plan.groups[groupIndex].actions[actionIndex].weight = e.detail.value
    this._refresh()
  },
  bindFrequencyInput: function (e) {
    let groupIndex = this._findGoupIndex(e)
    let actionIndex = this._findActionIndex(e)
    this.data.plan.groups[groupIndex].actions[actionIndex].frequency = e.detail.value
    this._refresh()
  },
  addGroup: function (e) {
    this.data.plan.groups.push(this._newGroup())
    this._refresh()
    console.log(this.data.plan.groups)
  },
  addAction: function(e) {
    let groupIndex = this._findGoupIndex(e)
    this.data.plan.groups[groupIndex].actions.push(this._newAction())
    this._refresh()
  },
  delAction: function (e) {
    let groupIndex = this._findGoupIndex(e)
    let actionIndex = this._findActionIndex(e)

    this.data.plan.groups[groupIndex].actions.splice(actionIndex, 1)
    this._refresh()
  },
  _refresh() {
    this.setData({ plan: this.data.plan })
  },
  _incrementId(){
    return ++this.data.showId;
  },
  _newGroup() {
    return {
      showId: this._incrementId(),
      count: 0,
      interval: 60,
      actions: [this._newAction()]
    }
  },
  _newAction() {
   return  {
     showId: this._incrementId(),
      name: '',
      weight: 0,
      frequency: 0,
      }
  },
  _findGoupIndex(e) {
    return util.findeIndexForShowId(this.data.plan.groups, e.currentTarget.dataset.group)
  },
  _findActionIndex(e) {
    let groupIndex = this._findGoupIndex(e)
    return util.findeIndexForShowId(this.data.plan.groups[groupIndex].actions, e.currentTarget.id)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
