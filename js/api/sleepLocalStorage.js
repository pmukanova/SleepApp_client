module.exports={
  storeAll: function (sleepsArray) {
    var sleepsStr=JSON.stringify(sleepsArray);

    localStorage.setItem("sleeps", sleepsStr);

  },
  getAll: function () {
    var sleeps=localStorage.getItem("sleeps");
    var s=JSON.parse(sleeps);
    return s;
  }
}
