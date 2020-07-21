let ping =1;
setInterval(ping++,100);
var geturl=function (urlList) {
  console.log(urlList)
    for(let i=0;i<urlList.length;i++){
      $("button").eq(i).append("<img src="+urlList[i]+"/"+Math.random()+" width='1' height='1' @error='autotest("+i+")' style='display:none'>");
    }
}
export { //很关键
  geturl
}
