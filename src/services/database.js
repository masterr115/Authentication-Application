require('colors')
const database = require('sqlite-async')
const path = require('path')

function createTable(db) {
    return db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT,
        name TEXT,
        verifyEmail TEXT
      );    
    `)
}

module.exports = database.open(path.join(__dirname, '../../database.sqlite')).then(createTable)