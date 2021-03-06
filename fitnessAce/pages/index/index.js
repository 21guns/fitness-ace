//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    topics:["胸","背","腿","肩"],
    weightUnits:["kg","lbs"],
    showId:1,
    inputValue: '',//点击结果项之后替换到文本框的值
    adapterSource: ["平板杠铃推胸", "下斜杠铃推胸", "上斜杠铃推胸", "weixin", "WeiXin", "wechat", "android", "Android", "ios", "iOS", "java", "javascript", "微信小程序", "微信公众号", "微信开发者",
      "微信开发者工具"],//本地匹配源
    bindSource: [],//绑定到页面的数据，根据用户输入动态变化
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
          weightUnit:'kg',
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
  delGroup: function (e) {
    let groupIndex = this._findGoupIndex(e)

    this.data.plan.groups.splice(groupIndex, 1)
    this._refresh()
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
  //当键盘输入时，触发input事件
  bindinput: function (e) {
    var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的结果
    if (prefix != "") {
      this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {
          newSource.push(e)
        }
      })
    }
    if (newSource.length != 0) {
      this.setData({
        bindSource: newSource
      })
    } else {
      this.setData({
        bindSource: []
      })
    }
  },
  itemtap: function (e) {
    this.setData({
      inputValue: e.target.id,
      bindSource: []
    })
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
