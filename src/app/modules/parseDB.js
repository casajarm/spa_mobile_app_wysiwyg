//var Parse = require('parse');
var ParseMockDB =  require('parse-mockdb');

ParseMockDB.mockDB(Parse); // Mock the Parse RESTController

// Perform saves, queries, updates, deletes, etc... using the Parse JS SDK

ParseMockDB.cleanUp(); // Clear the Database
ParseMockDB.unMockDB(); // Un-mock the Parse RESTController