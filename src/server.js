'use strict';

/*
##### Import Framework's
*/
var express = require('express')

const app = express()

const session = require('express-session')
const cookieParser = require('cookie-parser')

const cors = require('cors');
const bodyParser = require('body-parser')

const handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const expressHandlebars = require('express-handlebars')
const helmet = require('helmet')
const csrf = require('csurf')


/*
##### Import Services's (API, Environment variables and Other services essentials)
*/

require('dotenv').config()
require('./services/colors')
require('./services/database/tokens')
require('./services/database/users')
const helpers = require('./services/helpers')



/*
##### Initial Configuration (Setup Base for Front-End funcional)
*/

app.use(cors())
app.use(cookieParser())
app.use(session({ secret: process.env.APP_AUTHORIZATION_TOKEN, resave: false, saveUninitialized: true, cookie: { maxAge: 253402300000000 } }))

app.use(csrf({ cookie: true }))
app.use((req, res, next) => {

    res.cookie('XSRF-TOKEN', req.csrfToken())
    res.locals.csrfToken = req.csrfToken()

    next()

})

app.use(bodyParser.json({
    limit: '50mb'
}))

app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}))

app.use(express.static('public'))

app.engine('hbs', expressHandlebars({ handlebars: allowInsecurePrototypeAccess(handlebars), extname: 'hbs', defaultLayout: 'main', helpers }))
app.set('views', './src/app/view')
app.set('view engine', 'hbs')
app.use(helmet({
    contentSecurityPolicy: false,
}))

module.exports = app;

console.log = function(msg, ...options) {
    try {
        const ignore = '.returning() is not supported by mysql and will not have any effect.'
        if (msg.indexOf(ignore) === -1) {
            console.info(msg, ...options)
        }
    } catch {

    }

}

const { deleteAllTokens } = require('./app/model/tokens')

deleteAllTokens()

/*
##### Import Routes's (Essencial for Router's funcional Front-End)
*/


const routes = require('./routes').init()
app.use(routes)



/*
##### Listen Application (Start APP, and use Base Port to Front-End)
*/

app.listen(process.env.APP_PORT, () => { console.log(`\n[${process.env.APP_NAME}] ≈ Serviço Web iniciado com sucesso.\nRodando em: http://localhost:${process.env.APP_PORT}\n`) })