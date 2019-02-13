const parseClient = require('../util/parse-client');
const Cache = require('../util/cache');

module.exports = function(config)  {
  let client = parseClient(config);
  let cache = Cache('auth');

  function auth(req, res, next) {
    // if no session token, bad request
    if(!req.headers['x-session-token']){
      res.status(400).send("Missing sessionToken")
      return
    }
    
    let authToken = req.headers['x-session-token']

    //if user in session, forward the request
    cache.get(authToken)
      .then( user => user == null ? client.getMe(authToken) : user )
      .then( user => cache.set(authToken, user) )
      .then( user => {
        req.user = user;
        next();
      })
      .catch( error => {
        console.error('Fail to authenticate user', error);
        res.sendStatus(401);
      })
  }
  
  return auth
}