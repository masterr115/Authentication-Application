const db = require('../../services/database/users')

async function findUser(email) {
    const database = await db
    return await database.all(`SELECT * FROM users WHERE email = '${email}'`)
}

async function createUser({ name, email, password, verifyEmail }) {
    const database = await db
    return await database.run(`INSERT INTO users(email, password, name, verifyEmail) VALUES ('${email}', '${password}', '${name}', '${verifyEmail}')`)
}


module.exports = { findUser, createUser }