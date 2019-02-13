const redis = require('redis');
const {config} = require('./config');
const {promisify} = require('util');

// Define redis promisses

promisify.promisifyAll(redis.RedisClient.prototype);
promisify.promisifyAll(redis.Multi.prototype);

let redisClient = redis.createClient(config.cache.port, config.cache.host, {db: 1});

module.exports = function(prefix) {
  return {
    set: function(_key, value) {
      let key = `${prefix}:${_key}`
      return redisClient.setAsync(key, JSON.stringify(value))
        .then(() => redisClient.persistAsync(key))
        .then(() => redisClient.expireAsync(key, config.cache.ttl))
        .then(() => value)
    },

    get: function(_key) {
      let key = `${prefix}:${_key}`
      return redisClient.getAsync(key)
        .then(value => value == null ? null : JSON.parse(value))
    },

    del: function(_key) {
      let key = `${prefix}:${_key}`
      return redisClient.delAsync(key)
    }
  }
}