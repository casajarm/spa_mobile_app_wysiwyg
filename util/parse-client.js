const request = require('request-promise');
//const {promisify} = require('util');
//promisify.promisifyAll(request);

function getMe(authToken) {
      return request({
        uri: config.uri + '/users/me',
        method: 'GET',
        json: true,
        headers: {
          'X-Parse-Application-Id': config.applicationId,
          'X-Parse-REST-API-Key': config.restKey,
          'X-Parse-Session-Token': authToken
        }
      })
    }

module.exports = getMe;    