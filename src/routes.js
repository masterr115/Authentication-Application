'use strict'

const Router = require('express-group-router');
const router = new Router();

/*
##### Import Controller's (Utilized for API's asyncronous)
*/

const { isLoggedIn } = require('./middlewares/auth')

const { RenderLogin, RenderRegister } = require('./controller/auth/renders');
const { RenderDashboard } = require('./controller/main/renders');

/*
##### Router (Main Pages and Controller API)
*/

router.group(router => {
    router.get('/', RenderLogin)
    router.get('/register', RenderRegister)
    router.get('/dashboard', isLoggedIn, RenderDashboard)
})

router.group('/account', router => {
    router.post('/login')
    router.post('/create')
    router.post('/logout')
})

module.exports = router