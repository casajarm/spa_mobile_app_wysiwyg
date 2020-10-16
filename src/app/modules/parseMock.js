define(function (require) {
    var Parse = require('../../../node_modules/parse');
    var ParseMockDB = require('../../../node_modules/parse-mockdb'); // require('parse-mockdb');
    
    ParseMockDB.mockDB(Parse); // Mock the Parse RESTController

    // Perform saves, queries, updates, deletes, etc... using the Parse JS SDK

    ParseMockDB.cleanUp(); // Clear the Database
    ParseMockDB.unMockDB(); // Un-mock the Parse RESTController

});