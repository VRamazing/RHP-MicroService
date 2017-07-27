var express = require('express');
dns = require('dns');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.set('Content-Type','text/plain');
	var disp = {"ipaddress":"","language":"","software":""}
	try{
		for(var name in req.headers){
			
			if(name == 'host'){
				//var str = req.headers[name];
				dns.lookup('www.vigneshramesh.in', function(err, address, family){
					disp.ipaddress = address;
					console.log("1." + disp.ipaddress);
				});
				console.log("2."+ disp.ipaddress);
			}
			else if(name == 'accept-language'){
				st = req.headers[name];
				pos1 = st.indexOf(',');
				st = st.substr(0,pos1);
				disp.language = st;
			
			}
			else if(name == 'user-agent'){
				st = req.headers[name];
				pos1 = st.indexOf('(');
				pos2 = st.indexOf(')');
				st = st.substring(pos1 + 1 , pos2);
				disp.software = st;
			
				
			}		
		}
	}
	catch(ex){
		console.log(ex)
	}
	finally{
		console.log(disp);
		res.send(disp);
	}
	
});

module.exports = router;
