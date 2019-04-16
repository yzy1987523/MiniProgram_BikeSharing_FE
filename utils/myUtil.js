function get(key){
  //获取当前的status，如果没有则从本地数据中获取
  var status = wx.getStorageSync(key);
  if (!status) {
    status = getApp().globalData[key];
  }
  return status;
}
module.exports={
  get
}