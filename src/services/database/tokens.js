require('colors')
const database = require('sqlite-async')
const path = require('path')

function createTable(db) {
    return db.exec(`
      CREATE TABLE IF NOT EXISTS tokens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT,
        token TEXT
      );    
    `)
}

module.exports = database.open(path.join(__dirname, '../../../tokens.sqlite')).then(createTable)