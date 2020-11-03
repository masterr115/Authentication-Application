const db = require('../../services/database/tokens')

async function findToken(user) {
    const database = await db
    return await database.all(`SELECT * FROM tokens WHERE user = '${user}'`)
}

async function createToken({ user, token }) {
    const database = await db
    return await database.run(`INSERT INTO tokens(user, token) VALUES ('${user}', '${token}')`)
}

async function deleteAllTokens() {
    const database = await db
    return await database.run(`DELETE FROM tokens;`)
}


module.exports = { findToken, createToken, deleteAllTokens }