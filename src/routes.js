'use strict'

const Router = require('express-group-router');
const router = new Router();

/*
##### Import Controller's (Utilized for API's asyncronous)
*/

const { isLoggedIn, notLoggedIn } = require('./middlewares/auth')

const { RenderLogin, RenderRegister, RenderLogout } = require('./app/controller/auth/renders');
const { LoginController, RegisterController } = require('./app/controller/auth/controllers')
const { RenderDashboard } = require('./app/controller/main/renders');


/*
##### Router (Main Pages and Controller API)
*/

router.group(router => {
    router.get('/', notLoggedIn, RenderLogin)
    router.get('/register', notLoggedIn, RenderRegister)
    router.get('/dashboard', isLoggedIn, RenderDashboard)
})

router.group('/account', router => {
    router.post('/login', LoginController)
    router.post('/create', RegisterController)
    router.get('/logout', isLoggedIn, RenderLogout)
})

module.exports = router