'use strict';

//
// server.js
//

const app = require('./app');  
const port = 4040;

app.listen(port, function() {  
    console.log('Express server listening on port ' + port);
});