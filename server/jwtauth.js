var UserModel = require('./api/usuarios');
var jwt = require('jwt-simple');
var jwtTokenSecret = 'YOUR_SECRET_STRING';
 
module.exports = function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['authorization'];
  console.log('Token:'+token);
  if(token){
  	console.log('BLALBLABA')
  }
  console.log(token)
  if (token) {
  try {
    var decoded = jwt.decode(token, jwtTokenSecret);
    console.log('Token True');
 	console.log('decoded:'+decoded);
    if (decoded.exp <= Date.now()) {
	 	res.send(401);
		console.log('Date NOT okkkkkk');
	}
 	
	console.log('TOKEN OKKKKK');
	next();
  } catch (err) {
    res.send(409);
    console.log('Token Error');
  }
} else {
	console.log('Token False');
  	//next();
  	res.send(401);
}
};