var d1 = new Date('2016/03/28 10:17:22');
var d2 = new Date('2016/03/28 11:17:22');
console.log(parseInt(d2 - d1));//两个时间相差的毫秒数
console.log(parseInt(d2 - d1) / 1000);//两个时间相差的秒数
console.log(parseInt(d2 - d1) / 1000 / 60);//两个时间相差的分钟数
console.log(parseInt(d2 - d1) / 1000 / 60);//两个时间相差的小时数