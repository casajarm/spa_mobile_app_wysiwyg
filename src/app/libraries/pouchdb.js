'use strict'
var PouchDB = require('pouchdb');
var db = new PouchDB('mojos', {adapter: 'memory'});

export {PouchDB, db}