function get(key){
  //获取当前的status，如果没有则从本地数据中获取
  var value = wx.getStorageSync(key);
  if (!value) {
    value = getApp().globalData[key];
  }
  return value;
}

module.exports={
  get
}