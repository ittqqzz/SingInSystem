// var os = require('os'),
//     iptable = {},
//     ifaces = os.networkInterfaces();
// for (var dev in ifaces) {
//     ifaces[dev].forEach(function(details,alias){
//         if (details.family=='IPv4') {
//             iptable[dev+(alias?':'+alias:'')]=details.address;
//         }
//     });
// }
// console.log( iptable );
var os=require("os");

var networkInterfaces=os.networkInterfaces();

var ip=networkInterfaces['WLAN'][1].address;

console.info("ip地址为："+ip);