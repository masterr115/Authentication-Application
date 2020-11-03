module.exports = {
    async isLoggedIn(req, res, next) {
        if (req.session.user != undefined) { next() } else { res.redirect('/') }
    },

    async notLoggedIn(req, res, next) {
        if (req.session.user == undefined) { next() } else { res.redirect('/dashboard') }
    }
}