var express = require('express');
var getIP = require('ipware')().get_ip
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.set('Content-Type','text/plain');
	var disp = {"ipaddress":"","language":"","software":""}
	disp.ipaddress = getIP(req).clientIp
	for(var name in req.headers){
		if(name == 'accept-language'){
			st = req.headers[name];
			pos1 = st.indexOf(',');
			st = st.substr(0,pos1);
			disp.language = st;}

		if(name == 'user-agent'){
			st = req.headers[name];
			pos1 = st.indexOf('(');
			pos2 = st.indexOf(')');
			st = st.substring(pos1 + 1 , pos2);
			disp.software = st;
		}			
	}
			
	res.send(disp);
		
});

module.exports = router;
