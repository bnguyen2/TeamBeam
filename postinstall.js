const createTables = require('./db/schema.js');

createTables()
.then(() => process.exit(0));
